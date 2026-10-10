"use client"

import { useEffect, useRef, useState } from "react"

import { Reveal } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

const STATUS_CLASS = ["ok", "now", "todo"] as const

// Etapas do processo. A linha se preenche e o painel de exemplo muda de
// status conforme a rolagem passa por cada etapa.
export function Process() {
  const { process } = site
  const listRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<Array<HTMLLIElement | null>>([])
  const [active, setActive] = useState(0)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    let pending = false

    const sync = () => {
      const vh = window.innerHeight
      let idx = 0
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < vh * 0.6) idx = i
      })
      setActive(idx)

      const list = listRef.current
      if (list) {
        const r = list.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (vh * 0.6 - r.top - 20) / Math.max(1, r.height - 40)))
        setLineHeight(progress * Math.max(0, r.height - 16))
      }
    }
    const onScroll = () => {
      if (pending) return
      pending = true
      requestAnimationFrame(() => {
        pending = false
        sync()
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    sync()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const total = process.steps.length

  return (
    <section className="secao" id="como-funciona">
      <div className="wrap proc">
        <div>
          <div className="cabecalho">
            <span className="etiqueta">{process.label}</span>
            <SplitHeading>{process.title}</SplitHeading>
            <Reveal as="p">{process.description}</Reveal>
          </div>

          <div className="lista-passos" ref={listRef}>
            <span className="fio" aria-hidden="true" style={{ height: lineHeight }} />
            <ol>
              {process.steps.map((step, i) => (
                <li
                  key={step.key}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  className={cn("passo", i < active && "feito", i === active && "ativo")}
                >
                  <span className="bolha">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="fatos">
            <p className="fatos-titulo">{process.commitments.title}</p>
            <ul>
              {process.commitments.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trk">
          <div className="trk-topo">
            <span>{process.tracker.title}</span>
            <span>
              {process.stepLabel} {active + 1} de {total}
            </span>
          </div>
          <div className="trk-barra">
            <i style={{ width: `${((active + 1) / total) * 100}%` }} />
          </div>
          <div className="trk-corpo">
            <p className="trk-nota">{process.tracker.note}</p>
            {process.steps.map((step, i) => {
              const state = i < active ? 0 : i === active ? 1 : 2
              return (
                <div key={step.key} className="trk-lin">
                  <span>{step.key}</span>
                  <span className={cn("s", STATUS_CLASS[state])}>
                    {process.tracker.statuses[state]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

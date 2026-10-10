"use client"

import { useEffect, useRef, useState } from "react"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

const TEXT = site.hero.title

// Demonstração animada do painel de conteúdo: digita o título, confere a
// prévia e publica. Começa já no estado final, que é o que aparece sem
// JavaScript ou com movimento reduzido.
export function PanelDemo() {
  const { panel } = site
  const ref = useRef<HTMLDivElement>(null)
  const [typed, setTyped] = useState(TEXT)
  const [published, setPublished] = useState(true)
  const [pulse, setPulse] = useState(false)
  const [press, setPress] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (calmo || !("IntersectionObserver" in window)) return

    let cancelled = false
    let visible = false
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    // Espera o tempo pedido e, em seguida, a demonstração voltar a ficar visível.
    const wait = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms)).then(
        () =>
          new Promise<void>((resolve) => {
            const check = () => {
              if (cancelled || visible) resolve()
              else setTimeout(check, 250)
            }
            check()
          })
      )

    void (async () => {
      while (!cancelled) {
        setPublished(false)
        setToast(false)
        setTyped("")
        await wait(1200)
        for (let i = 1; i <= TEXT.length; i++) {
          if (cancelled) return
          setTyped(TEXT.slice(0, i))
          await wait(46)
        }
        await wait(700)
        setPulse(true)
        await wait(1000)
        setPulse(false)
        setPress(true)
        await wait(260)
        setPress(false)
        setPublished(true)
        setToast(true)
        await wait(4600)
      }
    })()

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className="painel">
      <div className="painel-barra">
        <span className="semaforo">
          <i />
          <i />
          <i />
        </span>
        <span>{panel.barTitle}</span>
        <span className="demo">{panel.demoLabel}</span>
      </div>
      <div className="painel-corpo">
        <div className="painel-menu">
          {panel.menu.map((item, i) => (
            <span key={item} className={i === 0 ? "ativo" : undefined}>
              {item}
            </span>
          ))}
        </div>
        <div className="painel-principal">
          <div className="painel-topo">
            <h4>{panel.heading}</h4>
            <span className={cn("st", published ? "st--pub" : "st--rascunho")}>
              {published ? panel.published : panel.draft}
            </span>
          </div>
          <div className="painel-duas">
            <div className="painel-campos">
              <div className="campo">
                <small>{panel.titleField}</small>
                <span className="valor">
                  <span>{typed}</span>
                  <i className="cursor" />
                </span>
              </div>
              <div className="campo">
                <small>{panel.ctaField}</small>
                <span className="valor">{panel.ctaValue}</span>
              </div>
              <div className="painel-acoes">
                <span className={cn("btn-mini", pulse && "pulse")}>{panel.preview}</span>
                <span className={cn("btn-mini btn-mini--acento", press && "press")}>
                  {panel.publish}
                </span>
              </div>
            </div>
            <div className="previa">
              <div className="previa-barra">
                <i />
                <i />
                <i />
                <span className={cn("no-ar", published && "on")}>{panel.live}</span>
              </div>
              <div className="previa-corpo">
                <div className="mini-hero">
                  <b>{typed}</b>
                  <span className="mini-btn">{panel.miniButton}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cn("toast", toast && "on")}>{panel.published}</div>
    </div>
  )
}

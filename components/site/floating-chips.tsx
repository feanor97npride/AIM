"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

type Chip = {
  text: string
  depth: number
  delay: string
  position: CSSProperties
  icon: ReactNode
}

const chips: Chip[] = [
  {
    text: "Nova conversa no WhatsApp",
    depth: 28,
    delay: "0s",
    position: { left: "4%", top: "22%" },
    icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
  },
  {
    text: "Prévia conferida no celular",
    depth: -20,
    delay: "-2.4s",
    position: { right: "4%", top: "16%" },
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </>
    ),
  },
  {
    text: "Rascunho salvo",
    depth: 38,
    delay: "-4.2s",
    position: { left: "8%", top: "62%" },
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M9 14l2 2 4-4" />
      </>
    ),
  },
  {
    text: "Versão publicada",
    depth: -34,
    delay: "-1.2s",
    position: { right: "7%", top: "60%" },
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
]

// Cartões decorativos que se deslocam com o cursor (só em telas largas, com
// ponteiro fino e sem pedido de movimento reduzido).
export function FloatingChips() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const hero = root?.closest("section")
    if (!root || !hero) return

    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fino = window.matchMedia("(pointer: fine)").matches
    if (calmo || !fino) return

    const items = Array.from(root.querySelectorAll<HTMLElement>(".flt"))
    let targetX = 0, targetY = 0, x = 0, y = 0
    let running = false
    let raf = 0

    const step = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      items.forEach((el) => {
        const depth = parseFloat(el.dataset.depth ?? "0")
        el.style.transform = `translate3d(${x * depth}px,${y * depth}px,0)`
      })
      if (Math.abs(targetX - x) > 0.001 || Math.abs(targetY - y) > 0.001) {
        raf = requestAnimationFrame(step)
      } else {
        running = false
      }
    }
    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(step)
      }
    }

    const move = (e: Event) => {
      const ev = e as PointerEvent
      const r = hero.getBoundingClientRect()
      targetX = (ev.clientX - r.left) / r.width - 0.5
      targetY = (ev.clientY - r.top) / Math.min(r.height, 900) - 0.5
      start()
    }
    const leave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    hero.addEventListener("pointermove", move)
    hero.addEventListener("pointerleave", leave)
    return () => {
      hero.removeEventListener("pointermove", move)
      hero.removeEventListener("pointerleave", leave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={rootRef} className="flts" aria-hidden="true">
      {chips.map((chip) => (
        <div key={chip.text} className="flt" data-depth={chip.depth} style={chip.position}>
          <div className="chip" style={{ "--d": chip.delay } as CSSProperties}>
            <i>
              <svg {...iconProps}>{chip.icon}</svg>
            </i>
            {chip.text}
          </div>
        </div>
      ))}
    </div>
  )
}

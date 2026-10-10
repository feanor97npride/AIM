"use client"

import { useEffect, useRef, useState } from "react"

// Número que sobe até o valor final quando entra na tela. Sem JavaScript ou
// com movimento reduzido, mostra o valor final direto.
export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (calmo || !("IntersectionObserver" in window)) return

    setValue(0)
    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        const t0 = performance.now()
        const duration = 1600
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <div ref={ref} className="numero">
      {value}
    </div>
  )
}

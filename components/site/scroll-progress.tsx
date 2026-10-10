"use client"

import { useEffect, useRef } from "react"

// Barra fina no topo que mostra quanto da página já foi lida.
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return

    let pending = false
    const update = () => {
      if (pending) return
      pending = true
      requestAnimationFrame(() => {
        pending = false
        const max = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      })
    }

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    update()

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return <div ref={ref} className="progresso" aria-hidden="true" />
}

"use client"

import { useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"

// Botão de só seta que aparece depois de uma tela de rolagem e leva ao topo.
export function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const botao = ref.current
    if (!botao) return

    let pending = false
    const update = () => {
      if (pending) return
      pending = true
      requestAnimationFrame(() => {
        pending = false
        botao.classList.toggle("on", window.scrollY > window.innerHeight)
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

  const voltar = () => {
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: calmo ? "auto" : "smooth" })
    // O botão some ao chegar ao topo; o foco vai para a marca, sem pular a rolagem.
    document.querySelector<HTMLElement>(".marca")?.focus({ preventScroll: true })
  }

  return (
    <button ref={ref} type="button" className="voltar-topo" onClick={voltar} aria-label="Voltar ao topo">
      <ArrowUp width={22} height={22} aria-hidden="true" />
    </button>
  )
}

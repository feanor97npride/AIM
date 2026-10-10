"use client"

import { createElement, type CSSProperties, type PointerEvent, type ReactNode } from "react"

import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

type RevealProps = {
  as?: "div" | "article" | "p"
  delay?: number
  // Acrescenta a luz que segue o cursor (classe .spot).
  spot?: boolean
  className?: string
  children: ReactNode
}

// Entrada sutil ao rolar (.rv). Só esconde o conteúdo quando a página marca
// a classe "anim" no <html>; sem JavaScript ou com movimento reduzido, tudo fica visível.
export function Reveal({ as = "div", delay = 0, spot = false, className, children }: RevealProps) {
  const [ref, on] = useReveal<HTMLElement>()

  function moveLight(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return createElement(
    as,
    {
      ref,
      className: cn("rv", spot && "spot", on && "in", className),
      style: { "--d": delay } as CSSProperties,
      onPointerMove: spot ? moveLight : undefined,
    },
    children
  )
}

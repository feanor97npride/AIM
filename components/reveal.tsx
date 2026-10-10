"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

// Entrada sutil ao rolar. Só esconde o conteúdo depois do carregamento no
// navegador, então sem JavaScript ele continua visível. Com redução de
// movimento ativa, as classes motion-reduce anulam a animação.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return

    setArmed(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        armed && !visible && "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

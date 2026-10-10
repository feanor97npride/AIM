"use client"

import { useEffect, useRef, useState } from "react"

// Diz quando o elemento entrou na tela. Com movimento reduzido ou sem
// IntersectionObserver, já nasce "visível" para não esconder conteúdo.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (calmo || !("IntersectionObserver" in window)) {
      setOn(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return [ref, on] as const
}

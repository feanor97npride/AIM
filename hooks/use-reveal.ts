"use client"

import { useEffect, useRef, useState } from "react"

// Diz quando o elemento entrou na tela. A classe "in" só faz diferença quando a
// página marca "anim" no <html> (ver app/layout.tsx). Com movimento reduzido, o
// CSS já deixa tudo visível, então não precisa de estado para isso.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!("IntersectionObserver" in window)) {
      el.classList.add("in")
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

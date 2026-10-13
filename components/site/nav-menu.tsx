"use client"

import { useEffect, useState } from "react"

import type { Link } from "@/lib/site-content"

// Menu principal. Destaca a seção que está no centro da tela.
export function NavMenu({ items }: { items: Link[] }) {
  const [active, setActive] = useState("")

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "inicio" ? "" : `#${entry.target.id}`)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    items.forEach((item) => {
      const el = document.getElementById(item.href.slice(1))
      if (el) observer.observe(el)
    })
    const inicio = document.getElementById("inicio")
    if (inicio) observer.observe(inicio)

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="menu" aria-label="Principal">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={active === item.href ? "on" : undefined}
          aria-current={active === item.href ? "location" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

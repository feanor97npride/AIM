"use client"

import { useEffect, useRef } from "react"

type Particle = { x: number; y: number; vx: number; vy: number; r: number }

// Partículas ligadas por linhas no bloco final, que reagem ao cursor. As cores
// vêm dos tokens da página, então acompanham o tema claro ou escuro.
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !host || !ctx) return

    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fino = window.matchMedia("(pointer: fine)").matches
    const esquema = window.matchMedia("(prefers-color-scheme: dark)")

    const token = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    let onDark = token("--on-dark") || "#F6F6F3"
    let hi = token("--accent-hi") || "#8FA2FF"
    const readColors = () => {
      onDark = token("--on-dark") || "#F6F6F3"
      hi = token("--accent-hi") || "#8FA2FF"
    }

    const P: Particle[] = []
    let W = 0, H = 0, px = -999, py = -999
    let pointerActive = false
    let visible = false
    let raf = 0

    const fit = () => {
      const r = host.getBoundingClientRect()
      const D = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width
      H = r.height
      canvas.width = Math.round(W * D)
      canvas.height = Math.round(H * D)
      ctx.setTransform(D, 0, 0, D, 0, 0)
      const n = W < 700 ? 40 : 86
      while (P.length < n) {
        P.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1 + Math.random() * 1.4,
        })
      }
      P.length = n
      P.forEach((p) => {
        if (p.x > W) p.x = Math.random() * W
        if (p.y > H) p.y = Math.random() * H
      })
    }

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, W, H)
      for (const p of P) {
        if (move) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > W) p.vx *= -1
          if (p.y < 0 || p.y > H) p.vy *= -1
          if (pointerActive) {
            const dx = px - p.x
            const dy = py - p.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 200 && d > 1) {
              p.x += (dx / d) * (1 - d / 200) * 1.3
              p.y += (dy / d) * (1 - d / 200) * 1.3
            }
          }
        }
        ctx.globalAlpha = 0.75
        ctx.fillStyle = onDark
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, 6.2832)
        ctx.fill()
      }

      ctx.lineWidth = 1
      ctx.strokeStyle = onDark
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].x - P[j].x
          const dy = P[i].y - P[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.globalAlpha = (1 - d / 110) * 0.22
            ctx.beginPath()
            ctx.moveTo(P[i].x, P[i].y)
            ctx.lineTo(P[j].x, P[j].y)
            ctx.stroke()
          }
        }
      }

      if (pointerActive) {
        ctx.strokeStyle = hi
        for (const p of P) {
          const dx = p.x - px
          const dy = p.y - py
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 180) {
            ctx.globalAlpha = (1 - d / 180) * 0.65
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(px, py)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const frame = () => {
      raf = 0
      if (!visible) return
      draw(true)
      raf = requestAnimationFrame(frame)
    }

    fit()
    const cleanups: Array<() => void> = []

    if (calmo) {
      const still = () => {
        fit()
        draw(false)
      }
      const onChange = () => {
        readColors()
        draw(false)
      }
      draw(false)
      window.addEventListener("resize", still)
      esquema.addEventListener("change", onChange)
      cleanups.push(() => {
        window.removeEventListener("resize", still)
        esquema.removeEventListener("change", onChange)
      })
    } else {
      const observer = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(frame)
      })
      observer.observe(host)
      window.addEventListener("resize", fit)
      esquema.addEventListener("change", readColors)
      cleanups.push(() => {
        observer.disconnect()
        window.removeEventListener("resize", fit)
        esquema.removeEventListener("change", readColors)
        if (raf) cancelAnimationFrame(raf)
      })

      if (fino) {
        const move = (e: Event) => {
          const ev = e as PointerEvent
          const r = host.getBoundingClientRect()
          px = ev.clientX - r.left
          py = ev.clientY - r.top
          pointerActive = true
        }
        const leave = () => {
          pointerActive = false
        }
        host.addEventListener("pointermove", move)
        host.addEventListener("pointerleave", leave)
        cleanups.push(() => {
          host.removeEventListener("pointermove", move)
          host.removeEventListener("pointerleave", leave)
        })
      }
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}

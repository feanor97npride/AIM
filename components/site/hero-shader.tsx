"use client"

import { useEffect, useRef } from "react"

const VERTEX = "#version 300 es\nin vec2 p;\nvoid main(){ gl_Position = vec4(p, 0.0, 1.0); }"

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_on;
uniform vec3 u_bg; uniform vec3 u_ink; uniform vec3 u_acc;
out vec4 o;
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5; mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.0 + 7.1; a *= 0.5; }
  return v;
}
void main(){
  vec2 frag = gl_FragCoord.xy;
  float s = min(u_res.x, u_res.y);
  vec2 p = (frag - 0.5 * u_res) / s;
  vec2 uv = frag / u_res;
  vec2 m = (u_mouse - 0.5 * u_res) / s;
  float t = u_time * 0.05;
  vec2 q = p * 1.5;
  vec2 w = vec2(fbm(q + vec2(0.0, t)), fbm(q + vec2(5.2, 1.3) - t));
  float f = fbm(q + 1.8 * w + vec2(t * 0.5));
  float d = length(p - m);
  f += u_on * 0.22 * exp(-d * d * 9.0);
  float g = f * 11.0;
  float l = abs(fract(g) - 0.5);
  float aw = max(fwidth(g) * 0.9, 0.0005);
  float k = 1.0 - smoothstep(0.0, aw, l);
  float strength = k * (0.2 + 0.55 * u_on * exp(-d * d * 7.0));
  float fade = smoothstep(0.0, 0.42, uv.y);
  vec2 c = (uv - vec2(0.5, 0.56)) * vec2(1.0, 1.7);
  float clear = 1.0 - 0.6 * exp(-dot(c, c) * 5.0);
  vec3 lc = mix(u_ink, u_acc, smoothstep(0.42, 0.74, f));
  vec3 col = mix(u_bg, u_acc, 0.07 * smoothstep(0.5, 0.82, f) * fade);
  col = mix(col, lc, clamp(strength * fade * clear, 0.0, 1.0));
  o = vec4(col, 1.0);
}`

type Rgb = [number, number, number]

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function toRgb(hex: string): Rgb {
  if (hex.charAt(0) !== "#") return [1, 1, 1]
  if (hex.length === 4) hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ]
}

// Curvas de nível em fluxo na abertura, que reagem ao cursor. Se o navegador
// não tiver WebGL2, o canvas some e o fundo liso continua legível.
export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.closest("section")
    if (!canvas || !hero) return

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    })
    if (!gl) {
      canvas.style.display = "none"
      return
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader))
        return null
      }
      return shader
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      canvas.style.display = "none"
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.bindAttribLocation(program, 0, "p")
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.display = "none"
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    const names = ["u_res", "u_time", "u_mouse", "u_on", "u_bg", "u_ink", "u_acc"] as const
    const U = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(program, n)])) as Record<
      (typeof names)[number],
      WebGLUniformLocation | null
    >

    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fino = window.matchMedia("(pointer: fine)").matches
    const esquema = window.matchMedia("(prefers-color-scheme: dark)")

    let bg = toRgb(token("--bg"))
    let ink = toRgb(token("--ink"))
    let acc = toRgb(token("--accent"))
    const readColors = () => {
      bg = toRgb(token("--bg"))
      ink = toRgb(token("--ink"))
      acc = toRgb(token("--accent"))
    }

    let mx = 0, my = 0, sx = 0, sy = 0, targetOn = 0, on = 0, dpr = 1

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(2, Math.round(r.width * dpr))
      const h = Math.max(2, Math.round(r.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const draw = (t: number) => {
      gl.uniform2f(U.u_res, canvas.width, canvas.height)
      gl.uniform1f(U.u_time, t)
      gl.uniform2f(U.u_mouse, sx * dpr, canvas.height - sy * dpr)
      gl.uniform1f(U.u_on, on)
      gl.uniform3fv(U.u_bg, bg)
      gl.uniform3fv(U.u_ink, ink)
      gl.uniform3fv(U.u_acc, acc)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    let visible = false
    let raf = 0
    const t0 = performance.now()
    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      sx += (mx - sx) * 0.07
      sy += (my - sy) * 0.07
      on += (targetOn - on) * 0.06
      draw((now - t0) / 1000)
      raf = requestAnimationFrame(frame)
    }

    const cleanups: Array<() => void> = []

    // Com movimento reduzido, ou sem cursor (celular), o fundo é desenhado uma vez e a
    // animação nem começa. Assim o celular não redesenha o shader a cada quadro.
    const estatico = calmo || !fino
    const redesenhar = () => {
      resize()
      if (estatico) draw(14)
    }
    const aoMudarEsquema = () => {
      readColors()
      if (estatico) draw(14)
    }
    const aoPerderContexto = (e: Event) => {
      // Sem contexto gráfico, o canvas some e o fundo liso continua legível.
      e.preventDefault()
      cancelAnimationFrame(raf)
      canvas.style.display = "none"
    }

    redesenhar()
    const observadorDeTamanho = new ResizeObserver(redesenhar)
    observadorDeTamanho.observe(canvas)
    esquema.addEventListener("change", aoMudarEsquema)
    canvas.addEventListener("webglcontextlost", aoPerderContexto)
    cleanups.push(() => {
      observadorDeTamanho.disconnect()
      esquema.removeEventListener("change", aoMudarEsquema)
      canvas.removeEventListener("webglcontextlost", aoPerderContexto)
    })

    if (!estatico) {
      const observer = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(frame)
      })
      observer.observe(canvas)
      cleanups.push(() => {
        observer.disconnect()
        if (raf) cancelAnimationFrame(raf)
      })

      const move = (e: Event) => {
        const ev = e as PointerEvent
        const r = canvas.getBoundingClientRect()
        mx = ev.clientX - r.left
        my = ev.clientY - r.top
        targetOn = 1
      }
      const leave = () => {
        targetOn = 0
      }
      hero.addEventListener("pointermove", move)
      hero.addEventListener("pointerleave", leave)
      cleanups.push(() => {
        hero.removeEventListener("pointermove", move)
        hero.removeEventListener("pointerleave", leave)
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} className="shader" aria-hidden="true" />
}

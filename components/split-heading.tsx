"use client"

import { Fragment, type CSSProperties } from "react"

import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3"
  children: string
  className?: string
}

// Título dividido em palavras, com revelação por máscara ao entrar na tela.
// O texto completo vai no aria-label, e as palavras ficam ocultas para leitores de tela.
export function SplitHeading({ as: Tag = "h2", children, className }: SplitHeadingProps) {
  const [ref, on] = useReveal<HTMLHeadingElement>()
  const words = children.trim().split(/\s+/)

  return (
    <Tag
      ref={ref}
      data-split
      aria-label={children}
      className={cn("pronto", on && "in", className)}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}

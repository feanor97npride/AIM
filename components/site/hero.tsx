import { ArrowRight, MessageCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { site } from "@/content/site"
import { whatsappUrl } from "@/lib/whatsapp"

export function Hero() {
  const { hero } = site

  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="space-y-8 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <Badge variant="outline" className="border-brand/30 text-brand">
            {hero.eyebrow}
          </Badge>

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {hero.title.before}{" "}
            <span className="text-brand">{hero.title.highlight}</span>
          </h1>

          <p className="max-w-xl text-lg text-pretty text-muted-foreground sm:text-xl">
            {hero.description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="brand" size="lg">
              <a href={whatsappUrl()}>
                <MessageCircle aria-hidden="true" />
                {hero.primaryCta}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">{hero.note}</p>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

// Composição decorativa de interface, sem conteúdo real de cliente.
function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-xl border bg-card shadow-xl">
        <div className="flex items-center gap-1.5 border-b bg-muted/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ml-4 h-5 flex-1 rounded-md bg-background" />
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-foreground/80" />
            <div className="h-8 w-20 rounded-md bg-brand" />
          </div>

          <div className="space-y-3">
            <div className="h-8 w-4/5 rounded-md bg-foreground/85" />
            <div className="h-8 w-3/5 rounded-md bg-foreground/85" />
            <div className="h-3 w-full rounded-full bg-muted-foreground/25" />
            <div className="h-3 w-11/12 rounded-full bg-muted-foreground/25" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-3 rounded-lg border p-3">
                <div className="size-8 rounded-md bg-secondary" />
                <div className="h-2.5 w-4/5 rounded-full bg-muted-foreground/25" />
                <div className="h-2.5 w-3/5 rounded-full bg-muted-foreground/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg sm:-left-8">
        <span className="grid size-9 place-items-center rounded-full bg-brand text-brand-foreground">
          <MessageCircle className="size-4" />
        </span>
        <div className="text-sm">
          <p className="font-medium">Nova conversa</p>
          <p className="text-muted-foreground">Pedido de orçamento</p>
        </div>
      </div>
    </div>
  )
}

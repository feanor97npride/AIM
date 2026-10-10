import { LayoutTemplate, Megaphone, Wrench, type LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/content/site"

const icons: Record<string, LucideIcon> = {
  site: LayoutTemplate,
  tools: Wrench,
  presence: Megaphone,
}

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Serviços"
          title="Três frentes para o seu negócio"
          description="Cada oferta tem resultado esperado e limites claros, para que você saiba exatamente o que está contratando."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {site.services.map((service, i) => {
            const Icon = icons[service.icon]

            return (
              <Reveal key={service.title} delay={i * 120} className="h-full">
                <Card className="h-full p-6 sm:p-8">
                  <span className="grid size-11 place-items-center rounded-lg bg-brand/10 text-brand">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>

                  <dl className="mt-auto space-y-4 border-t pt-6 text-sm">
                    <div>
                      <dt className="font-medium">Resultado</dt>
                      <dd className="mt-1 text-muted-foreground">{service.result}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Limites</dt>
                      <dd className="mt-1 text-muted-foreground">{service.limits}</dd>
                    </div>
                  </dl>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

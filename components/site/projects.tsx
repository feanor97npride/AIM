import { Blocks, LayoutTemplate, Workflow, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/content/site"

const thumbIcons: LucideIcon[] = [LayoutTemplate, Blocks, Workflow]

export function Projects() {
  return (
    <section id="projetos" className="scroll-mt-20 border-y bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projetos"
          title="Soluções com problema, caminho e entrega claros"
          description="Exemplos demonstrativos que ilustram o tipo de trabalho que realizamos."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {site.projects.map((project, i) => {
            const ThumbIcon = thumbIcons[i % thumbIcons.length]

            return (
              <Reveal key={project.title} delay={i * 120} className="h-full">
                <Card className="h-full gap-0 overflow-hidden py-0">
                  <div aria-hidden="true" className="flex aspect-[16/9] items-center justify-center border-b bg-muted/60 p-6 md:aspect-[4/3]">
                    <div className="grid size-full place-items-center rounded-lg border bg-background shadow-sm">
                      <ThumbIcon className="size-10 text-muted-foreground/60" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
                    <div className="space-y-3">
                      <Badge variant="secondary">{project.label}</Badge>
                      <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                    </div>

                    <dl className="space-y-4 text-sm">
                      <div>
                        <dt className="font-medium">Problema</dt>
                        <dd className="mt-1 text-muted-foreground">{project.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Solução</dt>
                        <dd className="mt-1 text-muted-foreground">{project.solution}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Entrega</dt>
                        <dd className="mt-1 text-muted-foreground">{project.delivery}</dd>
                      </div>
                    </dl>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

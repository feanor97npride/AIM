import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/content/site"

export function Process() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Como funciona"
          title="Do primeiro contato à entrega"
          description="Um processo com etapas curtas e revisões antes de publicar."
        />

        <ol className="grid gap-x-8 gap-y-10 md:grid-cols-4">
          {site.process.map((step, i) => (
            <li key={step.title} className="h-full">
              <Reveal delay={i * 100} className="h-full space-y-4 border-t-2 border-foreground/10 pt-6">
                <span className="font-mono text-sm font-medium text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

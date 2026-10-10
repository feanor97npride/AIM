import { Counter } from "@/components/site/counter"
import { FloatingChips } from "@/components/site/floating-chips"
import { HeroShader } from "@/components/site/hero-shader"
import { PanelDemo } from "@/components/site/panel-demo"
import { Reveal } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import type { Site } from "@/lib/site-content"
import { whatsappUrl } from "@/lib/whatsapp"

export function Hero({ site }: { site: Site }) {
  const { hero, numbers } = site

  return (
    <>
      <section className="hero" id="inicio">
        <HeroShader />
        <FloatingChips />

        <div className="wrap hero-conteudo">
          <span className="pill-topo">
            <i aria-hidden="true" />
            {hero.pill}
          </span>
          <SplitHeading as="h1">{hero.title}</SplitHeading>
          <p className="lead">{hero.lead}</p>
          <div className="acoes">
            <a className="btn btn-primario" href={whatsappUrl(site.whatsapp.number, site.whatsapp.message)}>
              {hero.primaryCta}
            </a>
            <a className="btn btn-ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>

          <PanelDemo />
        </div>
      </section>

      <div className="wrap">
        <div className="numeros">
          {numbers.map((item, i) => (
            <Reveal key={item.label} delay={i}>
              <Counter to={item.to} />
              <p>{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}

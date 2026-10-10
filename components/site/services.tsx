import { Reveal } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import { site, type ServiceVisual } from "@/content/site"
import { cn } from "@/lib/utils"

function Visual({ visual }: { visual: ServiceVisual }) {
  if (visual.type === "site") {
    return (
      <div className="mini-site" aria-hidden="true">
        <div className="mini-barra">
          <i />
          <i />
          <i />
          <span>{visual.domain}</span>
        </div>
        <div className="mini-corpo">
          <div className="mini-hero">
            <b style={{ minHeight: 0 }}>{visual.headline}</b>
            <span className="mini-btn">{visual.button}</span>
          </div>
          <div className="mini-cols">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    )
  }

  if (visual.type === "flow") {
    return (
      <div className="fluxo" aria-hidden="true">
        {visual.steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    )
  }

  return (
    <div className="chips" aria-hidden="true">
      {visual.items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}

export function Services() {
  const { services, channels } = site

  return (
    <section className="secao" id="servicos">
      <div className="wrap">
        <div className="cabecalho">
          <span className="etiqueta">{services.label}</span>
          <SplitHeading>{services.title}</SplitHeading>
          <Reveal as="p">{services.description}</Reveal>
        </div>

        <div className="bento">
          {services.items.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              spot
              delay={i}
              className={cn("card", i === 0 && "card--grande")}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="card-visual">
                <Visual visual={item.visual} />
              </div>
              <dl>
                <div>
                  <dt>Resultado</dt>
                  <dd>{item.result}</dd>
                </div>
                <div>
                  <dt>Limite</dt>
                  <dd>{item.limit}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>

        <SplitHeading as="h3" className="canais-titulo">
          {channels.title}
        </SplitHeading>
        <div className="canais" role="group" aria-label={channels.label}>
          {channels.rows.map((row, r) => (
            <div key={r} className={cn("trilho", r === 1 && "inverso")} aria-hidden={r === 1 || undefined}>
              {[0, 1].map((copy) => (
                <div key={copy} className="grupo" aria-hidden={copy === 1 ? true : undefined}>
                  {row.map((name) => (
                    <span key={name} className="canal">
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

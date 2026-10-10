import { Reveal } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import { site, type ProjectVisual } from "@/content/site"
import type { CSSProperties } from "react"

function Visual({ visual }: { visual: ProjectVisual }) {
  return (
    <div className="web" aria-hidden="true">
      <div className="web-barra">
        <i />
        <i />
        <i />
      </div>
      <div className="web-corpo">
        {visual.type === "hero" && (
          <>
            <div className="web-hero" style={{ "--b": visual.color } as CSSProperties}>
              <b>{visual.headline}</b>
              <span className="web-btn">{visual.button}</span>
            </div>
            <div className="web-grade">
              <span />
              <span />
              <span />
            </div>
            <span className="web-linha" />
            <span className="web-linha curta" />
          </>
        )}

        {visual.type === "table" && (
          <div className="web-tabela">
            {visual.rows.map((row) => (
              <div key={row.label} className="web-pedido">
                <div>
                  <span className="barra-i" />
                  <span className="barra-i curta" />
                </div>
                <span className={`pill pill--${row.tone}`}>{row.label}</span>
              </div>
            ))}
          </div>
        )}

        {visual.type === "mosaic" && (
          <>
            <div className="web-mosaico">
              {visual.colors.map((color) => (
                <span key={color} style={{ background: color }} />
              ))}
            </div>
            <span className="web-linha" />
            <span className="web-linha curta" />
          </>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const { projects } = site

  return (
    <section className="secao" id="projetos">
      <div className="wrap">
        <div className="cabecalho">
          <span className="etiqueta">{projects.label}</span>
          <SplitHeading>{projects.title}</SplitHeading>
          <Reveal as="p">{projects.description}</Reveal>
        </div>

        <div className="projetos-grade">
          {projects.items.map((item, i) => (
            <Reveal key={item.title} as="article" spot delay={i} className="projeto">
              <div className="projeto-visual">
                <Visual visual={item.visual} />
              </div>
              <div className="projeto-corpo">
                <span className="tag">{projects.tag}</span>
                <h3>{item.title}</h3>
                <dl>
                  <div>
                    <dt>Problema</dt>
                    <dd>{item.problem}</dd>
                  </div>
                  <div>
                    <dt>Solução</dt>
                    <dd>{item.solution}</dd>
                  </div>
                  <div>
                    <dt>Entrega</dt>
                    <dd>{item.delivery}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

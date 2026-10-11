import { Particles } from "@/components/site/particles"
import { Reveal } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import type { Site } from "@/lib/site-content"
import { whatsappUrl } from "@/lib/whatsapp"

// Bloco escuro de contraste, com partículas ao fundo.
export function Contact({ site }: { site: Site }) {
  const { contact, socials, email } = site

  return (
    <section className="wrap fim" id="contato">
      <div className="cta">
        <Particles />
        <SplitHeading>{contact.title}</SplitHeading>
        <Reveal as="p" className="cta-texto">
          {contact.description}
        </Reveal>
        <div className="acoes">
          <a className="btn btn-primario" href={whatsappUrl(site.whatsapp.number, site.whatsapp.message)}>
            {contact.primaryCta}
          </a>
          <a className="btn btn-ghost" href={`mailto:${email}`}>
            {contact.emailCta}
          </a>
        </div>
        <div className="cta-contatos">
          <div>
            <span>{contact.emailLabel}</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          {socials.map((social) => (
            <div key={social.label}>
              <span>{social.label}</span>
              {social.url ? (
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.handle || social.url.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <span className="sem-link">{social.handle}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

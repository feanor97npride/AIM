import type { Site } from "@/lib/site-content"
import { whatsappUrl } from "@/lib/whatsapp"

export function Footer({ site }: { site: Site }) {
  const { footer, nav, socials, email, company } = site

  return (
    <footer className="rodape">
      <div className="wrap">
        <div className="rodape-grade">
          <div className="rodape-marca">
            <a className="marca" href="#inicio">
              <span className="logo-mark" aria-hidden="true" />
              {site.name}
            </a>
            <p>{footer.tagline}</p>
          </div>
          <div>
            <h2>{footer.navTitle}</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{footer.contactTitle}</h2>
            <ul>
              <li>
                <a href={whatsappUrl(site.whatsapp.number, site.whatsapp.message)}>WhatsApp</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>E-mail</a>
              </li>
              {socials.map((social) => (
                <li key={social.label}>
                  {social.url ? (
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.label}
                    </a>
                  ) : (
                    <span>{social.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{footer.legalTitle}</h2>
            <ul>
              <li>
                <a href={footer.privacy.href}>{footer.privacy.label}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="rodape-base">
          <span>
            © {new Date().getFullYear()} {site.name}. {company}
          </span>
          <span>{footer.notice}</span>
        </div>
      </div>
    </footer>
  )
}

import { MessageCircle } from "lucide-react"

import { NavMenu } from "@/components/site/nav-menu"
import type { Site } from "@/lib/site-content"
import { whatsappUrl } from "@/lib/whatsapp"

export function Header({ site }: { site: Site }) {
  return (
    <header className="topo">
      <div className="barra">
        <a className="marca" href="#inicio">
          <span className="logo-mark" aria-hidden="true" />
          {site.name}
        </a>
        <NavMenu items={site.nav} />
        <a
          className="btn btn-primario btn-pequeno btn-header"
          href={whatsappUrl(site.whatsapp.number, site.whatsapp.message)}
          aria-label="Conversar no WhatsApp"
        >
          <MessageCircle aria-hidden="true" size={18} className="icone-whats" />
          <span>Conversar no WhatsApp</span>
        </a>
      </div>
    </header>
  )
}

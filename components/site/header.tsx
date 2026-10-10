import { MessageCircle } from "lucide-react"

import { NavMenu } from "@/components/site/nav-menu"
import { site } from "@/content/site"
import { whatsappUrl } from "@/lib/whatsapp"

export function Header() {
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
          href={whatsappUrl()}
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle aria-hidden="true" size={18} className="icone-whats" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </header>
  )
}

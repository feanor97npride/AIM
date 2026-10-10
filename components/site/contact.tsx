import { Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { site } from "@/content/site"
import { whatsappUrl } from "@/lib/whatsapp"

// Bloco escuro para o contraste pedido na direção visual.
export function Contact() {
  const { contact } = site

  return (
    <section id="contato" className="scroll-mt-20 bg-foreground py-20 text-background sm:py-28">
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-300">
            {contact.eyebrow}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {contact.title}
          </h2>
          <p className="max-w-xl text-lg text-pretty text-background/75">{contact.description}</p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg">
            <a href={whatsappUrl()}>
              <MessageCircle aria-hidden="true" />
              {contact.primaryCta}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
          >
            <a href={`mailto:${site.email}`}>
              <Mail aria-hidden="true" />
              {contact.emailCta}
            </a>
          </Button>
        </div>

        {site.socials.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-background/75">
            {site.socials.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-background hover:underline"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  )
}

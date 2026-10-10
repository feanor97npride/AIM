import { Menu, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { site } from "@/content/site"
import { whatsappUrl } from "@/lib/whatsapp"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#topo" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-md bg-primary text-xs text-primary-foreground"
          >
            SD
          </span>
          {site.name}
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <a href={whatsappUrl()}>
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>

          <details className="relative md:hidden">
            <summary
              aria-label="Abrir menu"
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border bg-background hover:bg-accent [&::-webkit-details-marker]:hidden"
            >
              <Menu aria-hidden="true" className="size-4" />
            </summary>
            <nav
              aria-label="Principal mobile"
              className="absolute right-0 top-11 w-56 rounded-lg border bg-card p-2 shadow-md"
            >
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

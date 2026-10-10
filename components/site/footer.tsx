import { site } from "@/content/site"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold tracking-tight">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.footer.tagline}</p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
            {site.email}
          </a>
          <a href={site.footer.privacy.href} className="transition-colors hover:text-foreground">
            {site.footer.privacy.label}
          </a>
        </nav>
      </div>

      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

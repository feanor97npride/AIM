import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Instrument_Sans, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google"

import "./globals.css"
import "./landing.css"
import { ScrollProgress } from "@/components/site/scroll-progress"
import { site } from "@/content/site"

// Fontes hospedadas junto com o site: o visitante não faz requisição ao Google.
const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
})
const text = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  // Prévia: fora da busca até o lançamento. Remover no dia da publicação.
  robots: { index: false, follow: false },
  openGraph: { title: site.name, description: site.shareDescription },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F6F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0D" },
  ],
}

// Decide, antes da primeira pintura, se as animações de entrada ficam ativas.
const motionScript = `(function(){var c=window.matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.classList.add(c?"calmo":"anim")})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${text.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a className="skip" href="#principal">
          Pular para o conteúdo
        </a>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}

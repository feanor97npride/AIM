import type { Metadata } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"

import "./globals.css"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: `${site.name} | Sites, ferramentas e presença digital`,
  description: site.description,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={GeistSans.variable}>
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-md"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  )
}

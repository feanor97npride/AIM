import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de privacidade",
}

// Rascunho provisório. O texto final depende da coleta real de dados do site
// (formulários e rastreamento ainda não existem no MVP).
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Política de privacidade</h1>
      <p className="text-muted-foreground">
        Esta página está em elaboração. O texto definitivo será publicado depois de definirmos
        quais dados o site coleta e para qual finalidade.
      </p>
      <Link href="/" className="inline-block text-sm font-medium text-brand underline-offset-4 hover:underline">
        Voltar para a página inicial
      </Link>
    </main>
  )
}

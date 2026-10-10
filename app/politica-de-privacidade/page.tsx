import type { Metadata } from "next"

import { site } from "@/content/site"

export const metadata: Metadata = {
  title: `Política de privacidade | ${site.name}`,
}

// Rascunho provisório. O texto final depende da coleta real de dados do site
// (formulários e rastreamento ainda não existem no MVP).
export default function PrivacyPage() {
  return (
    <main id="principal" className="wrap pagina">
      <h1>Política de privacidade</h1>
      <p>
        Esta página está em elaboração. O texto definitivo será publicado depois de definirmos
        quais dados o site coleta e para qual finalidade.
      </p>
      <p>
        Enquanto isso, se tiver dúvidas sobre seus dados, escreva para{" "}
        <a href={`mailto:${site.email}`} style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
          {site.email}
        </a>
        .
      </p>
      <a className="btn btn-primario" href="/">
        Voltar para a página inicial
      </a>
    </main>
  )
}

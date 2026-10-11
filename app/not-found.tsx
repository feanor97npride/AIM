import Link from "next/link"

export default function NotFound() {
  return (
    <main id="principal" className="wrap">
      <h1>Esta página não existe.</h1>
      <Link className="btn btn-primario" href="/">
        Voltar para o início
      </Link>
    </main>
  )
}

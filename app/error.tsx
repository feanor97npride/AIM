"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function ErroPagina({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="principal" className="wrap">
      <h1>Algo deu errado.</h1>
      <button className="btn btn-primario" type="button" onClick={() => reset()}>
        Tentar de novo
      </button>
      <Link className="btn btn-ghost" href="/">
        Voltar para o início
      </Link>
    </main>
  )
}

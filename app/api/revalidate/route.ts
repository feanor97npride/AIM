import { revalidateTag } from "next/cache"
import { isValidSignature } from "@sanity/webhook"

import { ETIQUETA_CONTEUDO } from "@/lib/site-content"

// O webhook da Sanity envia só o tipo do documento, então o corpo é pequeno.
const LIMITE_BYTES = 16 * 1024

const ASSINATURA = "sanity-webhook-signature"

// Chamado pelo webhook da Sanity quando o documento siteSettings é publicado.
// Confere a assinatura antes de revalidar; sem ela, qualquer um poderia forçar atualizações.
export async function POST(req: Request) {
  const segredo = process.env.SANITY_REVALIDATE_SECRET?.trim()
  if (!segredo) {
    return new Response("SANITY_REVALIDATE_SECRET não está definida.", { status: 500 })
  }

  const tamanho = Number(req.headers.get("content-length") ?? "0")
  if (tamanho > LIMITE_BYTES) {
    return new Response("Corpo grande demais.", { status: 413 })
  }

  const assinatura = req.headers.get(ASSINATURA)
  if (!assinatura) {
    return new Response("Assinatura ausente.", { status: 401 })
  }

  // Lê o corpo cru: a assinatura é calculada sobre os bytes exatos, não sobre o JSON reescrito.
  const corpo = await req.text()
  if (new TextEncoder().encode(corpo).length > LIMITE_BYTES) {
    return new Response("Corpo grande demais.", { status: 413 })
  }

  let valida = false
  try {
    valida = await isValidSignature(corpo, assinatura, segredo)
  } catch {
    valida = false
  }
  if (!valida) {
    return new Response("Assinatura inválida.", { status: 401 })
  }

  let documento: { _type?: unknown }
  try {
    documento = JSON.parse(corpo)
  } catch {
    return new Response("Corpo não é JSON.", { status: 400 })
  }

  // Outro tipo de documento não afeta o site. Responde 200 para a Sanity não reenviar.
  if (documento._type !== "siteSettings") {
    return Response.json({ revalidado: false, motivo: "tipo fora do site" })
  }

  // Expira na hora. Com "max", o primeiro visitante depois da publicação ainda receberia a página antiga.
  revalidateTag(ETIQUETA_CONTEUDO, { expire: 0 })
  return Response.json({ revalidado: true })
}

export function GET() {
  return new Response("Método não permitido.", { status: 405, headers: { Allow: "POST" } })
}

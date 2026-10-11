import { cache } from "react"
import { z } from "zod"

import {
  canaisPresenca,
  compromissos,
  destinoSecundario,
  destinosMenu,
  etiquetaDemonstrativa,
  politicaPrivacidade,
  rotulosRedes,
  tonsTabela,
} from "@/content/fixo"

// Conteúdo publicado do documento `siteSettings` na Sanity. A forma segue o
// schema do Studio (studio/schemaTypes/siteSettings.ts).
const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/)
const botao = z.object({ text: z.string(), label: z.string(), message: z.string() })
const redeSocial = z
  .object({ handle: z.string().optional(), url: z.string().optional() })
  .optional()

const conteudoSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  shareDescription: z.string(),
  whatsapp: z.object({ number: z.string().regex(/^55\d{10,11}$/), message: z.string() }),
  email: z.string(),
  instagram: redeSocial,
  linkedin: redeSocial,
  legalName: z.string(),
  cnpj: z.string(),
  navigation: z.object({
    servicos: z.string(),
    projetos: z.string(),
    comoFunciona: z.string(),
    contato: z.string(),
  }),
  hero: z.object({
    pill: z.string(),
    title: z.string(),
    lead: z.string(),
    primaryCta: z.string(),
    secondaryCtaLabel: z.string(),
  }),
  numbers: z.array(z.object({ to: z.number(), label: z.string() })).length(4),
  services: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    cta: botao,
    items: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          result: z.string(),
          limit: z.string(),
        })
      )
      .length(3),
    siteVisual: z.object({ domain: z.string(), headline: z.string(), button: z.string() }),
    flowSteps: z.array(z.string()).length(3),
  }),
  channels: z.object({
    title: z.string(),
    label: z.string(),
    row: z.array(z.string()).min(1).max(8),
  }),
  projects: z.object({
    isDemonstrative: z.boolean().default(true),
    label: z.string(),
    title: z.string(),
    description: z.string(),
    cta: botao,
    items: z
      .array(
        z.object({
          title: z.string(),
          problem: z.string(),
          solution: z.string(),
          delivery: z.string(),
        })
      )
      .length(3),
    heroVisual: z.object({ color: hex, headline: z.string(), button: z.string() }),
    tableLabels: z.array(z.string()).length(3),
    mosaicColors: z.array(hex).length(5),
  }),
  process: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    stepLabel: z.string(),
    tracker: z.object({
      title: z.string(),
      note: z.string(),
      statuses: z.array(z.string()).length(3),
    }),
    steps: z
      .array(z.object({ title: z.string(), description: z.string(), trackerLabel: z.string() }))
      .length(4),
  }),
  contact: z.object({
    title: z.string(),
    description: z.string(),
    primaryCta: z.string(),
    emailCta: z.string(),
    emailLabel: z.string(),
  }),
  footer: z.object({
    tagline: z.string(),
    navTitle: z.string(),
    contactTitle: z.string(),
    legalTitle: z.string(),
    notice: z.string().optional(),
  }),
})

export type Link = { label: string; href: string }

export type ServiceVisual =
  | { type: "site"; domain: string; headline: string; button: string }
  | { type: "flow"; steps: string[] }
  | { type: "chips"; items: string[] }

export type ProjectVisual =
  | { type: "hero"; color: string; headline: string; button: string }
  | { type: "table"; rows: { label: string; tone: "novo" | "preparo" | "entregue" }[] }
  | { type: "mosaic"; colors: string[] }

// Forma que as seções recebem: o conteúdo da Sanity somado à estrutura fixa do código.
export type Site = {
  name: string
  title: string
  description: string
  shareDescription: string
  whatsapp: { number: string; message: string }
  email: string
  socials: { label: string; handle: string; url: string }[]
  company: string
  nav: Link[]
  hero: { pill: string; title: string; lead: string; primaryCta: string; secondaryCta: Link }
  numbers: { to: number; label: string }[]
  services: {
    label: string
    title: string
    description: string
    cta: { text: string; label: string; message: string }
    items: { title: string; description: string; result: string; limit: string; visual: ServiceVisual }[]
  }
  channels: { title: string; label: string; rows: string[][] }
  projects: {
    isDemonstrative: boolean
    tag: string
    label: string
    title: string
    description: string
    cta: { text: string; label: string; message: string }
    items: { title: string; problem: string; solution: string; delivery: string; visual: ProjectVisual }[]
  }
  process: {
    label: string
    title: string
    description: string
    stepLabel: string
    commitments: { title: string; items: string[] }
    tracker: { title: string; note: string; statuses: string[] }
    steps: { title: string; description: string; trackerLabel: string }[]
  }
  contact: { title: string; description: string; primaryCta: string; emailCta: string; emailLabel: string }
  footer: {
    tagline: string
    navTitle: string
    contactTitle: string
    legalTitle: string
    privacy: Link
    notice: string
  }
}

type Conteudo = z.infer<typeof conteudoSchema>

// Junta o conteúdo da Sanity com a estrutura fixa do código.
export function montarSite(c: Conteudo): Site {
  const visuaisServicos: ServiceVisual[] = [
    { type: "site", ...c.services.siteVisual },
    { type: "flow", steps: c.services.flowSteps },
    { type: "chips", items: canaisPresenca },
  ]
  const visuaisProjetos: ProjectVisual[] = [
    { type: "hero", ...c.projects.heroVisual },
    {
      type: "table",
      rows: c.projects.tableLabels.map((label, i) => ({ label, tone: tonsTabela[i] })),
    },
    { type: "mosaic", colors: c.projects.mosaicColors },
  ]
  const redes = [c.instagram, c.linkedin]

  return {
    name: c.name,
    title: c.title,
    description: c.description,
    shareDescription: c.shareDescription,
    whatsapp: { number: c.whatsapp.number, message: c.whatsapp.message },
    email: c.email,
    socials: redes.map((rede, i) => ({
      label: rotulosRedes[i],
      handle: rede?.handle ?? "",
      url: rede?.url ?? "",
    })),
    company: `${c.legalName}, CNPJ ${c.cnpj}`,
    nav: [
      { label: c.navigation.servicos, href: destinosMenu[0] },
      { label: c.navigation.projetos, href: destinosMenu[1] },
      { label: c.navigation.comoFunciona, href: destinosMenu[2] },
      { label: c.navigation.contato, href: destinosMenu[3] },
    ],
    hero: {
      pill: c.hero.pill,
      title: c.hero.title,
      lead: c.hero.lead,
      primaryCta: c.hero.primaryCta,
      secondaryCta: { label: c.hero.secondaryCtaLabel, href: destinoSecundario },
    },
    numbers: c.numbers,
    services: {
      label: c.services.label,
      title: c.services.title,
      description: c.services.description,
      cta: c.services.cta,
      items: c.services.items.map((item, i) => ({ ...item, visual: visuaisServicos[i] })),
    },
    channels: { title: c.channels.title, label: c.channels.label, rows: [c.channels.row] },
    projects: {
      isDemonstrative: c.projects.isDemonstrative,
      tag: etiquetaDemonstrativa,
      label: c.projects.label,
      title: c.projects.title,
      description: c.projects.description,
      cta: c.projects.cta,
      items: c.projects.items.map((item, i) => ({ ...item, visual: visuaisProjetos[i] })),
    },
    process: {
      label: c.process.label,
      title: c.process.title,
      description: c.process.description,
      stepLabel: c.process.stepLabel,
      commitments: compromissos,
      tracker: c.process.tracker,
      steps: c.process.steps,
    },
    contact: {
      title: c.contact.title,
      description: c.contact.description,
      primaryCta: c.contact.primaryCta,
      emailCta: c.contact.emailCta,
      emailLabel: c.contact.emailLabel,
    },
    footer: {
      tagline: c.footer.tagline,
      navTitle: c.footer.navTitle,
      contactTitle: c.footer.contactTitle,
      legalTitle: c.footer.legalTitle,
      privacy: politicaPrivacidade,
      notice: c.footer.notice ?? "",
    },
  }
}

const consulta = '*[_id == "siteSettings"][0]'

// Etiqueta do cache das leituras da Sanity. O webhook de publicação revalida por ela.
export const ETIQUETA_CONTEUDO = "site-content"

// Lê o conteúdo publicado na Sanity. Sem conteúdo, ou se a resposta não bater
// com o schema, o build falha: não há cópia de reserva (decisão D4).
export const getSiteContent = cache(async (): Promise<Site> => {
  const projeto = process.env.SANITY_PROJECT_ID?.trim()
  if (!projeto) throw new Error("SANITY_PROJECT_ID não está definida.")
  const dataset = process.env.SANITY_DATASET?.trim() || "production"

  const url = `https://${projeto}.apicdn.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(consulta)}`
  const resposta = await fetch(url, { next: { tags: [ETIQUETA_CONTEUDO], revalidate: 300 } })
  if (!resposta.ok) throw new Error(`Sanity respondeu HTTP ${resposta.status}.`)

  const { result } = (await resposta.json()) as { result: unknown }
  if (!result) throw new Error('Não há documento "siteSettings" publicado na Sanity.')

  const conteudo = conteudoSchema.safeParse(result)
  if (!conteudo.success) {
    const primeiro = conteudo.error.issues[0]
    throw new Error(`Conteúdo fora do schema em ${primeiro.path.join(".")}: ${primeiro.message}`)
  }
  return montarSite(conteudo.data)
})

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {estrutura} from './structure'
import {schemaTypes} from './schemaTypes'

// Valores vêm do ambiente do Studio (não são segredos). Ver studio/README.md.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? ''
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const siteUrl = process.env.SANITY_STUDIO_SITE_URL

export default defineConfig({
  name: 'default',
  title: 'Conteúdo da landing page',
  projectId,
  dataset,
  plugins: [structureTool({structure: estrutura})],
  schema: {types: schemaTypes},
  document: {
    // O documento de configurações existe uma vez só, com ID fixo.
    singletons: ['siteSettings'],
    // Link "Ver no site" dentro do Studio.
    productionUrl: async (prev) => siteUrl ?? prev,
  },
})

import type {StructureResolver} from 'sanity/structure'

// Um item fixo: o Studio abre direto o conteúdo do site, sem lista de documentos.
export const estrutura: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .id('siteSettings')
        .title('Conteúdo do site')
        .child(S.document().documentId('siteSettings').schemaType('siteSettings')),
    ])

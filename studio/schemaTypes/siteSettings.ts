import {defineArrayMember, defineField, defineType} from 'sanity'
import {
  contrasteContraBranco,
  REGEX_CNPJ,
  REGEX_HEX,
  REGEX_WHATSAPP,
} from '../lib/validacao'

// Os nomes dos campos seguem `content/site.ts`, para a migração da F2 ser direta.
// Ficam fora do painel: o bloco da demonstração (D7), prazo, valor e revisões (D6),
// imagens (D11), tipos de visual e chaves técnicas (D9, D10).

type Opcoes = {opcional?: boolean; group?: string}

// Linha de texto, obrigatória por padrão.
function texto(name: string, title: string, max: number, {opcional = false, group}: Opcoes = {}) {
  return defineField({
    name,
    title,
    group,
    type: 'string',
    validation: (rule) => (opcional ? rule.max(max) : rule.required().max(max)),
  })
}

// Parágrafo (texto com quebras de linha).
function paragrafo(name: string, title: string, max: number, {group}: Opcoes = {}) {
  return defineField({
    name,
    title,
    group,
    type: 'text',
    rows: 3,
    validation: (rule) => rule.required().max(max),
  })
}

// Lista de textos com quantidade fixa.
function lista(name: string, title: string, quantidade: number, max: number, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: 'array',
    of: [{type: 'string', validation: (rule) => rule.required().max(max)}],
    validation: (rule) => rule.min(quantidade).max(quantidade),
  })
}

// Lista de cores hex com quantidade fixa.
function listaDeCores(name: string, title: string, quantidade: number) {
  return defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'string',
        validation: (rule) => rule.required().regex(REGEX_HEX, {name: 'formato #RRGGBB'}),
      },
    ],
    validation: (rule) => rule.min(quantidade).max(quantidade),
  })
}

// Botão com texto de apoio e mensagem inicial do WhatsApp (sempre dentro de outro objeto).
function botao(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      paragrafo('text', 'Texto de apoio', 160),
      texto('label', 'Texto do botão', 40),
      paragrafo('message', 'Mensagem inicial no WhatsApp', 200),
    ],
  })
}

// Cor de fundo do exemplo: texto branco precisa de contraste de pelo menos 4,5 : 1.
function corDeFundo() {
  return defineField({
    name: 'color',
    title: 'Cor de fundo (#RRGGBB)',
    type: 'string',
    validation: (rule) =>
      rule
        .required()
        .regex(REGEX_HEX, {name: 'formato #RRGGBB'})
        .custom((valor) => {
          if (typeof valor !== 'string' || !REGEX_HEX.test(valor)) return true
          const razao = contrasteContraBranco(valor)
          return razao >= 4.5
            ? true
            : `Contraste ${razao.toFixed(2).replace('.', ',')} : 1 com texto branco. Mínimo: 4,5 : 1.`
        }),
  })
}

const itemServico = defineArrayMember({
  type: 'object',
  name: 'itemServico',
  title: 'Serviço',
  fields: [
    texto('title', 'Título', 60),
    paragrafo('description', 'Descrição', 140),
    paragrafo('result', 'Resultado esperado', 140),
    paragrafo('limit', 'O que fica de fora', 160),
  ],
})

const itemProjeto = defineArrayMember({
  type: 'object',
  name: 'itemProjeto',
  title: 'Projeto',
  fields: [
    texto('title', 'Título', 60),
    paragrafo('problem', 'Problema', 160),
    paragrafo('solution', 'Solução aplicada', 180),
    paragrafo('delivery', 'O que foi entregue', 140),
  ],
})

const etapaProcesso = defineArrayMember({
  type: 'object',
  name: 'etapaProcesso',
  title: 'Etapa',
  fields: [
    texto('title', 'Título', 60),
    paragrafo('description', 'Descrição', 160),
    texto('trackerLabel', 'Nome no acompanhamento', 40),
  ],
})

const numero = defineArrayMember({
  type: 'object',
  name: 'numero',
  title: 'Número',
  fields: [
    defineField({
      name: 'to',
      title: 'Valor (inteiro de 0 a 999)',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0).max(999),
    }),
    texto('label', 'Legenda', 60),
  ],
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Conteúdo do site',
  type: 'document',
  groups: [
    {name: 'identidade', title: 'Identidade', default: true},
    {name: 'contato', title: 'Dados de contato'},
    {name: 'navegacao', title: 'Menu'},
    {name: 'abertura', title: 'Abertura'},
    {name: 'numeros', title: 'Números'},
    {name: 'servicos', title: 'Serviços'},
    {name: 'canais', title: 'Canais'},
    {name: 'projetos', title: 'Projetos'},
    {name: 'processo', title: 'Como funciona'},
    {name: 'secaoContato', title: 'Seção de contato'},
    {name: 'rodape', title: 'Rodapé'},
  ],
  fields: [
    // Identidade
    texto('name', 'Nome do site', 40, {group: 'identidade'}),
    texto('title', 'Título da aba do navegador (SEO)', 70, {group: 'identidade'}),
    defineField({
      name: 'description',
      title: 'Descrição para buscadores',
      group: 'identidade',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'shareDescription',
      title: 'Descrição ao compartilhar',
      group: 'identidade',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(120),
    }),

    // Dados de contato
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      group: 'contato',
      type: 'object',
      fields: [
        defineField({
          name: 'number',
          title: 'Número com DDI e DDD (só dígitos)',
          description: 'Ex.: 5511999999999. Sem espaços, traços ou parênteses.',
          type: 'string',
          validation: (rule) =>
            rule.required().regex(REGEX_WHATSAPP, {
              name: 'DDI 55, DDD e número, só dígitos',
            }),
        }),
        paragrafo('message', 'Mensagem inicial', 300),
      ],
    }),
    defineField({
      name: 'email',
      title: 'E-mail de contato',
      group: 'contato',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      group: 'contato',
      type: 'object',
      description: 'Sem endereço, o item aparece como texto, sem link.',
      fields: [
        texto('handle', 'Perfil (ex.: @empresa)', 60, {opcional: true}),
        defineField({
          name: 'url',
          title: 'Endereço (https)',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
      ],
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      group: 'contato',
      type: 'object',
      description: 'Sem endereço, o item aparece como texto, sem link.',
      fields: [
        texto('handle', 'Perfil ou página', 60, {opcional: true}),
        defineField({
          name: 'url',
          title: 'Endereço (https)',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
      ],
    }),
    texto('legalName', 'Razão social', 120, {group: 'contato'}),
    defineField({
      name: 'cnpj',
      title: 'CNPJ',
      group: 'contato',
      type: 'string',
      validation: (rule) => rule.required().regex(REGEX_CNPJ, {name: 'formato 00.000.000/0000-00'}),
    }),

    // Menu: os destinos (âncoras) ficam no código
    defineField({
      name: 'navigation',
      title: 'Nomes no menu',
      group: 'navegacao',
      type: 'object',
      fields: [
        texto('servicos', 'Serviços', 30),
        texto('projetos', 'Projetos', 30),
        texto('comoFunciona', 'Como funciona', 30),
        texto('contato', 'Contato', 30),
      ],
    }),

    // Abertura
    defineField({
      name: 'hero',
      title: 'Abertura',
      group: 'abertura',
      type: 'object',
      fields: [
        texto('pill', 'Selo acima do título', 60),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          validation: (rule) => rule.required().max(90),
        }),
        paragrafo('lead', 'Texto de apoio', 280),
        texto('primaryCta', 'Botão principal (WhatsApp)', 40),
        texto('secondaryCtaLabel', 'Botão secundário (leva a Projetos)', 40),
      ],
    }),

    // Números
    defineField({
      name: 'numbers',
      title: 'Números',
      group: 'numeros',
      type: 'array',
      description: 'Exatamente 4 itens.',
      of: [numero],
      validation: (rule) => rule.min(4).max(4),
    }),

    // Serviços
    defineField({
      name: 'services',
      title: 'Serviços',
      group: 'servicos',
      type: 'object',
      fields: [
        texto('label', 'Etiqueta', 30),
        texto('title', 'Título', 90),
        paragrafo('description', 'Descrição', 220),
        botao('cta', 'Chamada e botão'),
        defineField({
          name: 'items',
          title: 'Serviços (exatamente 3)',
          type: 'array',
          of: [itemServico],
          validation: (rule) => rule.min(3).max(3),
        }),
        defineField({
          name: 'siteVisual',
          title: 'Ilustração do primeiro serviço (site)',
          type: 'object',
          fields: [
            texto('domain', 'Endereço de exemplo (sem https)', 40),
            texto('headline', 'Título da ilustração', 90),
            texto('button', 'Botão da ilustração', 40),
          ],
        }),
        lista('flowSteps', 'Ilustração do segundo serviço (fluxo): 3 etapas', 3, 40),
      ],
    }),

    // Canais
    defineField({
      name: 'channels',
      title: 'Canais',
      group: 'canais',
      type: 'object',
      fields: [
        texto('title', 'Título', 90),
        texto('label', 'Texto de apoio (leitores de tela)', 60),
        lista('row1', 'Primeira faixa de itens', 8, 30),
        lista('row2', 'Segunda faixa de itens', 8, 30),
      ],
    }),

    // Projetos (exemplos)
    defineField({
      name: 'projects',
      title: 'Projetos',
      group: 'projetos',
      type: 'object',
      fields: [
        defineField({
          name: 'isDemonstrative',
          title: 'Mostrar a etiqueta "Exemplo demonstrativo"',
          description: 'Mantenha ligado enquanto os casos não forem reais e autorizados.',
          type: 'boolean',
          initialValue: true,
        }),
        texto('label', 'Etiqueta', 30),
        texto('title', 'Título', 90),
        paragrafo('description', 'Descrição', 220),
        botao('cta', 'Chamada e botão'),
        defineField({
          name: 'items',
          title: 'Projetos (exatamente 3)',
          type: 'array',
          of: [itemProjeto],
          validation: (rule) => rule.min(3).max(3),
        }),
        defineField({
          name: 'heroVisual',
          title: 'Ilustração do primeiro projeto',
          type: 'object',
          fields: [
            corDeFundo(),
            texto('headline', 'Título da ilustração', 90),
            texto('button', 'Botão da ilustração', 40),
          ],
        }),
        lista('tableLabels', 'Ilustração do segundo projeto: 3 rótulos', 3, 30),
        listaDeCores('mosaicColors', 'Ilustração do terceiro projeto: 5 cores', 5),
      ],
    }),

    // Como funciona
    defineField({
      name: 'process',
      title: 'Como funciona',
      group: 'processo',
      type: 'object',
      fields: [
        texto('label', 'Etiqueta', 30),
        texto('title', 'Título', 90),
        paragrafo('description', 'Descrição', 220),
        texto('stepLabel', 'Palavra antes do número da etapa', 20),
        defineField({
          name: 'tracker',
          title: 'Exemplo de acompanhamento',
          type: 'object',
          fields: [
            texto('title', 'Título do exemplo', 30),
            texto('note', 'Linha de comentário', 80),
            lista(
              'statuses',
              'Status (3, nesta ordem: concluída, em andamento, a fazer)',
              3,
              30
            ),
          ],
        }),
        defineField({
          name: 'steps',
          title: 'Etapas (exatamente 4)',
          type: 'array',
          of: [etapaProcesso],
          validation: (rule) => rule.min(4).max(4),
        }),
      ],
    }),

    // Seção de contato
    defineField({
      name: 'contact',
      title: 'Seção de contato',
      group: 'secaoContato',
      type: 'object',
      fields: [
        texto('title', 'Título', 90),
        paragrafo('description', 'Descrição', 220),
        texto('primaryCta', 'Botão principal (WhatsApp)', 40),
        texto('emailCta', 'Botão de e-mail', 40),
        texto('emailLabel', 'Rótulo do e-mail', 30),
      ],
    }),

    // Rodapé
    defineField({
      name: 'footer',
      title: 'Rodapé',
      group: 'rodape',
      type: 'object',
      fields: [
        paragrafo('tagline', 'Frase de apresentação', 160),
        texto('navTitle', 'Título da coluna de navegação', 30),
        texto('contactTitle', 'Título da coluna de contato', 30),
        texto('legalTitle', 'Título da coluna legal', 30),
        defineField({
          name: 'notice',
          title: 'Aviso',
          description: 'Deixe vazio no lançamento.',
          type: 'string',
          validation: (rule) => rule.max(200),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name'},
    prepare: ({title}) => ({title: title || 'Conteúdo do site'}),
  },
})

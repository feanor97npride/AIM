// Conteúdo da landing page. Textos, contatos e itens exibidos ficam aqui,
// na mesma estrutura que o painel administrativo futuro vai editar.
//
// PLACEHOLDER: os valores marcados precisam ser substituídos antes de publicar
// (nome e domínio, número do WhatsApp, e-mail, redes e dados da empresa).

export type Link = { label: string; href: string }

export type ServiceVisual =
  | { type: "site"; domain: string; headline: string; button: string }
  | { type: "flow"; steps: string[] }
  | { type: "chips"; items: string[] }

export type ProjectVisual =
  | { type: "hero"; color: string; headline: string; button: string }
  | { type: "table"; rows: { label: string; tone: "novo" | "preparo" | "entregue" }[] }
  | { type: "mosaic"; colors: string[] }

export const site = {
  name: "Soluções Digitais", // PLACEHOLDER: nome ainda em definição
  title: "Soluções Digitais | Presença digital que gera conversas",
  description:
    "Sites, ferramentas e presença digital para o seu negócio. Converse com a gente pelo WhatsApp.",
  shareDescription: "Sites, ferramentas e presença digital que geram conversas.",
  whatsapp: {
    number: "5500000000000", // PLACEHOLDER: DDI + DDD + número, somente dígitos
    message: "Olá! Quero conversar sobre uma solução digital para o meu negócio.",
  },
  email: "contato@seudominio.com.br", // PLACEHOLDER
  // PLACEHOLDER: sem endereço (url), o item aparece como texto, sem link.
  socials: [
    { label: "Instagram", handle: "@seuperfil", url: "" },
    { label: "LinkedIn", handle: "linkedin.com/company/seuperfil", url: "" },
  ],
  company: "[Razão social], CNPJ [00.000.000/0000-00]", // PLACEHOLDER

  nav: [
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Contato", href: "#contato" },
  ] satisfies Link[],

  hero: {
    pill: "Sites, ferramentas e presença digital",
    title: "Presença digital que gera conversas.",
    lead: "Criamos sites, ferramentas e uma presença online clara. Quem chega entende sua oferta logo na primeira tela e sabe como começar a conversa.",
    primaryCta: "Conversar no WhatsApp",
    secondaryCta: { label: "Ver projetos", href: "#projetos" },
  },

  panel: {
    barTitle: "Painel de conteúdo",
    demoLabel: "Demonstração",
    menu: ["Página inicial", "Serviços", "Projetos", "Identidade e contato", "Publicação"],
    heading: "Página inicial",
    draft: "Rascunho não publicado",
    published: "Publicado",
    titleField: "Título",
    ctaField: "Texto e destino do botão principal",
    ctaValue: "Conversar no WhatsApp",
    preview: "Ver prévia",
    publish: "Publicar",
    live: "No ar",
    miniButton: "Falar no WhatsApp",
  },

  numbers: [
    { to: 3, label: "frentes de atuação" },
    { to: 4, label: "etapas, da conversa à entrega" },
    { to: 1, label: "conversa inicial antes de definir o escopo" },
    { to: 2, label: "canais de contato: WhatsApp e e-mail" },
  ],

  services: {
    label: "Serviços",
    title: "Três frentes para o seu negócio aparecer e funcionar.",
    description:
      "Cada oferta mostra o resultado esperado e o que fica de fora, para a escolha ficar clara desde o início.",
    cta: {
      text: "Não sabe qual frente faz sentido para o seu caso? Conte sua situação e a gente indica o caminho.",
      label: "Conversar sobre o meu caso",
      message: "Olá! Não sei qual serviço é o melhor para o meu caso. Podemos conversar?",
    },
    items: [
      {
        title: "Sites e landing pages",
        description: "Páginas rápidas e objetivas para apresentar sua oferta e receber contatos.",
        result: "Quem chega entende o que você faz e sabe como falar com você.",
        limit: "Textos e imagens vêm do cliente. Recursos avançados ficam para fases seguintes.",
        visual: {
          type: "site",
          domain: "seusite.com.br",
          headline: "Sua oferta, clara logo na primeira tela.",
          button: "Falar no WhatsApp",
        } satisfies ServiceVisual,
      },
      {
        title: "Ferramentas e automações",
        description: "Pequenos sistemas que tiram do papel e das mensagens as tarefas repetitivas.",
        result: "Menos retrabalho e informações reunidas em um lugar só.",
        limit: "Escopo definido pela necessidade. Integrações são avaliadas caso a caso.",
        visual: {
          type: "flow",
          steps: ["Formulário recebido", "Registro no painel", "Aviso para a equipe"],
        } satisfies ServiceVisual,
      },
      {
        title: "Presença digital",
        description:
          "Organização dos seus canais e das informações do negócio, para que sejam fáceis de encontrar.",
        result: "Uma apresentação coerente em todos os pontos de contato.",
        limit: "Não inclui gestão de anúncios nem produção contínua de conteúdo.",
        visual: {
          type: "chips",
          items: ["Site", "WhatsApp", "E-mail", "Redes"],
        } satisfies ServiceVisual,
      },
    ],
  },

  channels: {
    title: "Todos os seus canais levam à mesma conversa.",
    label: "Canais de contato e peças da presença digital",
    rows: [["Site institucional", "Landing page", "WhatsApp", "E-mail"]],
  },

  // Exemplos demonstrativos. Não são clientes reais: só trocar por casos reais, com autorização.
  projects: {
    label: "Projetos",
    title: "Do problema à entrega.",
    description:
      "Exemplos demonstrativos, com o problema, a solução aplicada e o que foi entregue.",
    tag: "Exemplo demonstrativo",
    cta: {
      text: "Quer algo parecido com um desses exemplos? Conte o que você precisa resolver.",
      label: "Falar sobre um projeto parecido",
      message: "Olá! Vi os exemplos no site e quero conversar sobre um projeto parecido.",
    },
    items: [
      {
        title: "Página de captação para consultório",
        problem: "Pacientes chegavam sem entender quais atendimentos existiam nem como agendar.",
        solution: "Uma página única, com serviços, localização e botão direto para o WhatsApp.",
        delivery: "Site responsivo, com o contato testado no celular.",
        visual: {
          type: "hero",
          color: "#C2410C", // laranja da marca: 5,2:1 com texto branco
          headline: "Atendimento com horário marcado.",
          button: "Agendar pelo WhatsApp",
        } satisfies ProjectVisual,
      },
      {
        title: "Organizador de pedidos para loja pequena",
        problem: "Pedidos se perdiam entre mensagens, anotações e planilhas.",
        solution: "Ferramenta web simples para registrar e acompanhar cada pedido.",
        delivery: "Painel com status por pedido e busca rápida.",
        visual: {
          type: "table",
          rows: [
            { label: "Entregue", tone: "entregue" },
            { label: "Em preparo", tone: "preparo" },
            { label: "Novo", tone: "novo" },
          ],
        } satisfies ProjectVisual,
      },
      {
        title: "Portfólio de estúdio criativo",
        problem: "Trabalhos espalhados dificultavam a apresentação para novos clientes.",
        solution: "Página organizada por tipo de serviço, com projetos e processo de contratação.",
        delivery: "Site com projetos em destaque e contato direto.",
        visual: {
          type: "mosaic",
          colors: ["#17181B", "#2E4BF0", "#F26B4F", "#F1EFEA", "#D6EAD2"],
        } satisfies ProjectVisual,
      },
    ],
  },

  process: {
    label: "Como funciona",
    title: "Um caminho simples, sem surpresas.",
    description:
      "Em cada etapa fica claro o que acontece e o que depende de você. Role a página e veja, no exemplo de acompanhamento, como o andamento muda.",
    stepLabel: "Etapa",
    // PENDENTE: prazo, valor e revisões são compromissos comerciais. Confirmar com o dono do negócio antes de publicar.
    commitments: {
      title: "Antes de começar, você sabe:",
      items: [
        "o que entra na primeira versão e o que fica para depois;",
        "o prazo, combinado no escopo;",
        "o valor, informado por escrito antes do início;",
        "quantas revisões estão incluídas.",
      ],
    },
    tracker: {
      title: "acompanhamento",
      note: "# exemplo de acompanhamento de um projeto",
      statuses: ["concluída", "em andamento", "a fazer"],
    },
    steps: [
      {
        title: "Conversa inicial",
        description: "Você conta o que precisa, para quem é a solução e qual prazo faz sentido.",
        key: "conversa_inicial",
      },
      {
        title: "Definição do escopo",
        description: "Organizamos o que entra na primeira versão e o que fica para depois.",
        key: "escopo_definido",
      },
      {
        title: "Desenvolvimento e validação",
        description: "Mostramos protótipos e ajustes antes da publicação, com revisões combinadas.",
        key: "desenvolvimento_validacao",
      },
      {
        title: "Entrega e suporte",
        description: "Publicamos, orientamos o uso e seguimos com o suporte contratado.",
        key: "entrega_suporte",
      },
    ],
  },

  contact: {
    title: "Conte o que você precisa.",
    description:
      "Explique a necessidade em poucas linhas. A conversa começa no WhatsApp, e os próximos passos são combinados ali mesmo.",
    primaryCta: "Conversar no WhatsApp",
    emailCta: "Enviar e-mail",
    emailLabel: "E-mail",
  },

  footer: {
    tagline:
      "Sites, ferramentas e presença digital para negócios que querem ser encontrados e entendidos.",
    navTitle: "Navegação",
    contactTitle: "Contato",
    legalTitle: "Legal",
    privacy: { label: "Política de privacidade", href: "/politica-de-privacidade" },
    notice: "Prévia de layout. Textos, contatos e dados do negócio são provisórios.",
  },
}

// Conteúdo da landing page. Textos, contatos e itens exibidos ficam aqui,
// na mesma estrutura que o painel administrativo futuro vai editar.
//
// PLACEHOLDER: os valores marcados precisam ser substituídos antes de publicar
// (nome e domínio, número do WhatsApp, e-mail e redes reais).

export const site = {
  name: "Soluções Digitais", // PLACEHOLDER: nome ainda em definição
  description:
    "Sites, ferramentas e apoio à presença digital para negócios que querem apresentar sua oferta com clareza e receber contatos qualificados.",
  whatsapp: {
    number: "5500000000000", // PLACEHOLDER: DDI + DDD + número, somente dígitos
    message: "Olá! Quero conversar sobre uma solução digital para o meu negócio.",
  },
  email: "contato@exemplo.com.br", // PLACEHOLDER
  socials: [] as { label: string; url: string }[], // preencher só com redes reais

  nav: [
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Contato", href: "#contato" },
  ],

  hero: {
    eyebrow: "Sites · Ferramentas · Presença digital",
    title: {
      before: "Sua presença digital,",
      highlight: "pronta para gerar conversas.",
    },
    description:
      "Criamos sites, ferramentas e automações que explicam sua oferta com clareza e levam o visitante até a conversa, sem complicação.",
    primaryCta: "Conversar no WhatsApp",
    secondaryCta: { label: "Ver projetos", href: "#projetos" },
    note: "Conte sua necessidade em poucas linhas.",
  },

  services: [
    {
      icon: "site",
      title: "Sites e landing pages",
      description:
        "Páginas institucionais e de captação, com estrutura clara e adaptadas ao celular, para apresentar sua oferta e receber contatos.",
      result: "Um endereço único para explicar o que você faz e como falar com você.",
      limits: "Não inclui loja virtual, pagamentos nem área de cliente.",
    },
    {
      icon: "tools",
      title: "Ferramentas e automações",
      description:
        "Sistemas simples e rotinas automatizadas para reduzir tarefas repetitivas e organizar as informações da equipe.",
      result: "Menos trabalho manual e informações reunidas em um só lugar.",
      limits:
        "O escopo é definido por processo. Integrações dependem das ferramentas que o negócio já usa.",
    },
    {
      icon: "presence",
      title: "Presença digital",
      description:
        "Apoio para organizar como o seu negócio aparece online: textos, identidade visual e canais de contato.",
      result: "Mensagem mais clara e canais de contato prontos para uso.",
      limits:
        "Não inclui gestão de anúncios nem produção de conteúdo recorrente, salvo contratação específica.",
    },
  ],

  // Exemplos demonstrativos e ilustrativos. Não são clientes reais.
  // Só trocar por casos reais, com autorização, e ajustar o rótulo.
  projects: [
    {
      title: "Página de captação para serviço local",
      label: "Exemplo demonstrativo",
      problem:
        "Clientes pediam orçamento por mensagem sem saber o que estava incluído no serviço.",
      solution:
        "Uma página curta com serviços, perguntas frequentes e botão direto para o WhatsApp.",
      delivery: "Site responsivo, com textos revisados e contato configurado.",
    },
    {
      title: "Ferramenta para organizar pedidos",
      label: "Exemplo demonstrativo",
      problem:
        "Solicitações chegavam por mensagens dispersas, sem padrão nem acompanhamento.",
      solution:
        "Um painel simples que reúne cada pedido e mostra em que etapa ele está.",
      delivery: "Ferramenta web com lista de pedidos e status atualizado.",
    },
    {
      title: "Rotina automatizada de comunicação",
      label: "Exemplo demonstrativo",
      problem: "Atualizações semanais eram enviadas manualmente, uma a uma.",
      solution:
        "Um fluxo que monta a mensagem com os dados atuais e a envia na rotina definida.",
      delivery: "Automação configurada, testada e documentada para a equipe.",
    },
  ],

  process: [
    {
      title: "Conversa inicial",
      description:
        "Você conta o problema ou a ideia. Entendemos o contexto, o público e o que precisa funcionar.",
    },
    {
      title: "Definição do escopo",
      description:
        "Combinamos entregas, conteúdos necessários e prazos, deixando claro o que está e o que não está incluído.",
    },
    {
      title: "Desenvolvimento e validação",
      description:
        "Construímos a versão e você a revisa no celular e no computador antes de qualquer publicação.",
    },
    {
      title: "Entrega e suporte",
      description:
        "Publicamos, orientamos o uso e seguimos com o suporte que tiver sido contratado.",
    },
  ],

  contact: {
    eyebrow: "Contato",
    title: "Conte qual é a necessidade do seu negócio.",
    description:
      "Uma mensagem curta já ajuda: o que você faz, o que quer resolver e para quando precisa.",
    primaryCta: "Chamar no WhatsApp",
    emailCta: "Enviar e-mail",
  },

  footer: {
    tagline: "Soluções digitais para apresentar negócios com clareza.",
    privacy: { label: "Política de privacidade", href: "/politica-de-privacidade" },
  },
}

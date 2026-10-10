// Estrutura e textos que ficam no código, fora do painel da Sanity:
// destinos de âncora, rótulos das redes, etiqueta dos exemplos e os
// compromissos de prazo e valor (decisão D6 do plano do painel).

export const destinosMenu = ["#servicos", "#projetos", "#como-funciona", "#contato"] as const

export const destinoSecundario = "#projetos"

export const rotulosRedes = ["Instagram", "LinkedIn"] as const

export const politicaPrivacidade = {
  label: "Política de privacidade",
  href: "/politica-de-privacidade",
}

export const etiquetaDemonstrativa = "Exemplo demonstrativo"

// Itens do desenho do terceiro serviço (decisão D9): ficam no código.
export const canaisPresenca = ["Site", "WhatsApp", "E-mail", "Redes"]

// Tom de cada linha da tabela de exemplo, pela ordem: entregue, em preparo, novo.
export const tonsTabela = ["entregue", "preparo", "novo"] as const

// PENDENTE: prazo, valor e revisões são compromissos comerciais. Confirmar com o dono do negócio antes de publicar.
export const compromissos = {
  title: "Antes de começar, você sabe:",
  items: [
    "o que entra na primeira versão e o que fica para depois;",
    "o prazo, combinado no escopo;",
    "o valor, informado por escrito antes do início;",
    "quantas revisões estão incluídas.",
  ],
}

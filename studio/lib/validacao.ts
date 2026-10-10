// Regras de formato usadas no Studio. Funções puras, para o script de checagem
// reaproveitar depois (ver project_specs.md, seção 9).

export const REGEX_WHATSAPP = /^55\d{10,11}$/
export const REGEX_CNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
export const REGEX_HEX = /^#[0-9A-Fa-f]{6}$/

// Luminância relativa do WCAG para uma cor #RRGGBB.
function luminancia(hex: string): number {
  const canais = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = canais.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Razão de contraste entre a cor e o branco (1 a 21). Regra do projeto: 4,5:1 ou mais.
export function contrasteContraBranco(hex: string): number {
  return 1.05 / (luminancia(hex) + 0.05)
}

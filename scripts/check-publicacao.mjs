// Checagem antes de publicar de verdade. Lê o conteúdo publicado na Sanity (a mesma
// fonte do site) e lista o que ainda é provisório, além de noindex e política em rascunho.
// Sai com código 1 se houver pendência. Não roda no build: a prévia continua publicável
// enquanto os dados não chegam.

import { readFileSync } from "node:fs";

const projeto = process.env.SANITY_PROJECT_ID?.trim();
const dataset = process.env.SANITY_DATASET?.trim() || "production";

if (!projeto) {
  console.log("SANITY_PROJECT_ID não está definida. Sem ela não dá para ler o conteúdo publicado.");
  process.exit(1);
}

// Mesma consulta e mesma API direta de lib/site-content.ts (sem a CDN).
const consulta = '*[_id == "siteSettings"][0]';
const url = `https://${projeto}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(consulta)}`;

let documento;
try {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    console.log(`A Sanity respondeu HTTP ${resposta.status}. Confira o SANITY_PROJECT_ID.`);
    process.exit(1);
  }
  ({ result: documento } = await resposta.json());
} catch (erro) {
  console.log(`Não foi possível ler a Sanity: ${erro.message}`);
  process.exit(1);
}

if (!documento) {
  console.log('Não há documento "siteSettings" publicado na Sanity.');
  process.exit(1);
}

const provisorio = /PLACEHOLDER|5500000000000|contato@seudominio\.com\.br|contato@exemplo\.com\.br|\[Razão social\]|00\.000\.000|seuperfil|Prévia de layout/;

// Lista todos os textos do documento com o caminho do campo, ignorando os campos de sistema (_id, _type...).
function textos(valor, caminho = "") {
  if (typeof valor === "string") return [{ caminho, texto: valor }];
  if (Array.isArray(valor)) return valor.flatMap((item, i) => textos(item, `${caminho}[${i}]`));
  if (valor && typeof valor === "object") {
    return Object.entries(valor)
      .filter(([chave]) => !chave.startsWith("_"))
      .flatMap(([chave, item]) => textos(item, caminho ? `${caminho}.${chave}` : chave));
  }
  return [];
}

const checagensDeCodigo = [
  {
    file: "app/layout.tsx",
    pattern: /index:\s*false/,
    message: "noindex ativo (remover no lançamento)",
  },
  {
    file: "app/politica-de-privacidade/page.tsx",
    pattern: /em elaboração/i,
    message: "política de privacidade em rascunho",
  },
];

let problemas = 0;

for (const { caminho, texto } of textos(documento)) {
  if (provisorio.test(texto)) {
    problemas += 1;
    console.log(`Sanity: ${caminho}  dado provisório  →  ${texto.trim()}`);
  }
}

for (const { file, pattern, message } of checagensDeCodigo) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (pattern.test(line)) {
      problemas += 1;
      console.log(`${file}:${i + 1}  ${message}  →  ${line.trim()}`);
    }
  });
}

if (documento.projects?.isDemonstrative) {
  console.log("Aviso: os projetos de exemplo estão marcados como demonstrativos. Troque por casos reais e autorizados quando houver.");
}

if (problemas > 0) {
  console.log(`\n${problemas} pendência(s) antes de publicar.`);
  process.exit(1);
}

console.log("Nenhuma pendência encontrada.");

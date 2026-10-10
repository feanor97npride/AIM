// Checagem antes de publicar de verdade. Lista o que ainda é provisório
// (placeholders, noindex, política em rascunho) e sai com código 1 se houver algo.
// Não roda no build: a prévia continua publicável enquanto os dados não chegam.

import { readFileSync } from "node:fs";

const checks = [
  {
    file: "content/site.ts",
    pattern: /PLACEHOLDER|5500000000000|contato@seudominio\.com\.br|contato@exemplo\.com\.br|\[Razão social\]|00\.000\.000|seuperfil|Prévia de layout/,
    message: "dado provisório",
  },
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

let problems = 0;

for (const { file, pattern, message } of checks) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (pattern.test(line)) {
      problems += 1;
      console.log(`${file}:${i + 1}  ${message}  →  ${line.trim()}`);
    }
  });
}

if (problems > 0) {
  console.log(`\n${problems} pendência(s) antes de publicar.`);
  process.exit(1);
}

console.log("Nenhuma pendência encontrada.");

# Build, publicação e notas de versão

Estado atual: o site está publicado no Hostinger, a partir da branch `main`. A automação de notas de versão do kit ainda não existe. Este arquivo diz o que é verdade hoje e o que fica para depois.

## Configuração da plataforma (Hostinger)

- **Tipo:** aplicação Node.js, conectada ao repositório `feanor97npride/AIM`.
- **Branch:** `main`. A branch `claude/nifty-turing-sni5k5` não é publicada.
- **Comando de build:** `pnpm install && pnpm build`. Se o painel não tiver pnpm, use `npm install -g pnpm` antes.
- **Comando de início:** `pnpm start`. Confira no painel a porta que a plataforma espera.
- **Variáveis:** `SANITY_PROJECT_ID` (obrigatória) e `SANITY_DATASET` (opcional, padrão `production`), que são o código do projeto e o conjunto de dados da Sanity. Não são segredos, mas ficam no painel da plataforma, não no repositório. Sem `SANITY_PROJECT_ID` o build falha. `SANITY_REVALIDATE_SECRET` é o segredo do webhook de publicação: é um segredo de verdade, fica só no painel da plataforma e precisa ser igual ao configurado no webhook da Sanity. Detalhes em `project_specs.md`, seção 10.
- **Domínio:** a definir. Hoje o endereço é o gerado pelo Hostinger.

## Build

- `pnpm install --frozen-lockfile` instala. Não há build no `postinstall`.
- `pnpm build` roda `next build --webpack` e gera `.next` com páginas estáticas (`/`, `/politica-de-privacidade`, `/icon.svg`). O Turbopack falhou no ambiente do Hostinger, por isso o Webpack.
- `pnpm start` serve o resultado. Rode `pnpm build` antes: o `start` não compila.
- O `next.config.mjs` define `typescript.ignoreBuildErrors: true`, então o build passa mesmo com erro de tipo. Rode `npx tsc --noEmit` e `pnpm lint` à parte.
- O build lê o conteúdo publicado do documento `siteSettings` na Sanity, pela API pública (`apicdn.sanity.io`). Precisa de rede até esse endereço. Sem documento publicado, ou com conteúdo fora do schema, o build falha: não há cópia de reserva.
- Para `pnpm dev`, defina `SANITY_PROJECT_ID` em `.env.local`. Esse arquivo não vai para o repositório.

## Fontes no build

As fontes (Schibsted Grotesk, Instrument Sans, JetBrains Mono) são baixadas do Google Fonts **durante o build**, por `next/font/google`, e depois servidas pelo próprio site. Consequências:

- o ambiente de build precisa alcançar `fonts.googleapis.com` e `fonts.gstatic.com`; sem isso, o build falha;
- depois de publicado, o visitante não faz requisição ao Google.

## Notas de versão (a implementar)

O kit descreve manifesto de notas gerado no build, histórico Git completo e variáveis `RELEASE_NOTES_*`. Nada disso existe aqui. Só faz sentido quando houver uma tela de novidades no painel. Até lá, não crie o commit de marco (`CONTRIBUTING.md`, seção "Estado neste projeto").

## Antes de publicar

- [ ] `pnpm lint` e `npx tsc --noEmit` passam.
- [ ] `pnpm build` passa numa instalação limpa (clone raso mais instalação).
- [ ] `pnpm check:publicacao` passa sem pendências: placeholders trocados, `noindex` removido de `app/layout.tsx`, política de privacidade com texto definitivo.
- [ ] Os exemplos demonstrativos foram trocados por casos reais e autorizados, ou continuam rotulados.
- [ ] O botão de WhatsApp foi testado no celular, com o número real.
- [ ] `SANITY_PROJECT_ID` está definida no painel da Hostinger, e o documento `siteSettings` está publicado na Sanity.
- [ ] Você sabe como voltar à versão anterior: o deploy anterior no painel do Hostinger, ou um commit de reversão na `main`.

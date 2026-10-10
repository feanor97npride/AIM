# Build, publicação e notas de versão

Estado atual: o projeto compila e roda localmente. A plataforma de publicação **ainda não foi escolhida**, e a automação de notas de versão do kit ainda não existe. Este arquivo diz o que é verdade hoje e o que fica para depois.

## Build

- `pnpm install --frozen-lockfile` instala. Não há build no `postinstall`.
- `pnpm build` gera `.next` com páginas estáticas (`/`, `/politica-de-privacidade`, `/icon.svg`).
- `pnpm start` serve o resultado. Rode `pnpm build` antes: o `start` não compila.
- O `next.config.mjs` define `typescript.ignoreBuildErrors: true`, então o build passa mesmo com erro de tipo. Rode `npx tsc --noEmit` à parte.

## Fontes no build

As fontes (Schibsted Grotesk, Instrument Sans, JetBrains Mono) são baixadas do Google Fonts **durante o build**, por `next/font/google`, e depois servidas pelo próprio site. Consequências:

- o ambiente de build precisa alcançar `fonts.googleapis.com` e `fonts.gstatic.com`; sem isso, o build falha;
- depois de publicado, o visitante não faz requisição ao Google.

## Configuração da plataforma

- **Plataforma:** a definir. A referência visual foi publicada em `vercel.app`, mas não há decisão registrada. Se for a Vercel, o Next.js dispensa configuração de comando: ela detecta o projeto.
- **Variáveis:** nenhuma hoje (`project_specs.md`, seção 10). Quando houver, segredos ficam só no painel da plataforma, nunca no repositório.
- **Domínio:** a definir.

## Notas de versão (a implementar)

O kit descreve manifesto de notas gerado no build, histórico Git completo e variáveis `RELEASE_NOTES_*`. Nada disso existe aqui. Só faz sentido quando houver uma tela de novidades no painel. Até lá, não crie o commit de marco (`CONTRIBUTING.md`, seção "Estado neste projeto").

## Antes de publicar

- [ ] `npx tsc --noEmit` e `pnpm build` passam numa instalação limpa (clone raso mais instalação).
- [ ] Todos os placeholders de `content/site.ts` foram trocados (WhatsApp, e-mail, redes, razão social, CNPJ, nome).
- [ ] O aviso "Prévia de layout" saiu do rodapé e a meta `robots: noindex` saiu de `app/layout.tsx`.
- [ ] A política de privacidade tem o texto definitivo.
- [ ] Os exemplos demonstrativos foram trocados por casos reais e autorizados, ou continuam rotulados.
- [ ] O botão de WhatsApp foi testado no celular, com o número real.
- [ ] Você sabe como voltar à versão anterior (deploy anterior disponível ou commit de reversão pronto).

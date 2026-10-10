# CLAUDE.md: AIM

AIM é a landing page de soluções digitais (site público de uma página), em Next.js 16, React 19, TypeScript, Tailwind v4 e um tema próprio (`app/landing.css`). O que o sistema faz está em `project_specs.md`. Regras de conduta estão em `docs/diretrizes-de-trabalho.md`. Commits e notas de versão estão em `CONTRIBUTING.md`.

## Comandos
- Instalar: `pnpm install --frozen-lockfile`. Não há build no `postinstall`.
- Lint: `pnpm lint` (ESLint 9 com as regras do Next; meta: 0 erros). Migrar para o ESLint 10 quando a configuração 16.4.0 completar duas semanas, depois de 20/10/2026.
- Tipos: `npx tsc --noEmit` (meta: 0 erros). O build não checa tipos.
- Build: `pnpm build`, que roda `next build --webpack`. Precisa de rede para baixar as fontes do Google.
- Desenvolvimento: `pnpm dev`. Não exige banco nem variáveis.
- Produção local: `pnpm build` e depois `pnpm start -p 3000`.
- Antes de publicar: `pnpm check:publicacao` lista placeholders, `noindex` e política em rascunho. Sai com erro enquanto houver pendências. Não roda no build.
- Ambiente: não há variáveis hoje (`project_specs.md`, seção 10).

## Checagens por área
| O que mudou | Rode |
|---|---|
| Qualquer código | `pnpm lint`, `npx tsc --noEmit` e `pnpm build` |
| Tela ou estilo | navegador em 390 px e 1440 px, claro e escuro, movimento reduzido; contraste e alvos de 44 px medidos no DOM (regra 9) |
| Texto da página | nota 9/10 (regra 2) |
| Publicação | `pnpm check:publicacao` |
| Notas de versão ou commit | ainda não há script (`CONTRIBUTING.md`, seção "Estado") |

## Onde ficam as coisas
- Textos, contatos e itens da página: `content/site.ts` (valores marcados PLACEHOLDER).
- Visual: `app/landing.css` (tokens e estilos da landing) e `app/globals.css` (ponte de nomes do shadcn). Efeitos: `components/site/`, `components/reveal.tsx`, `components/split-heading.tsx`, `hooks/use-reveal.ts`.
- Link do WhatsApp: `lib/whatsapp.ts`. Autenticação e API: não existem ainda.
- Dependências: `package.json`. Antes de remover um pacote, confirme que nenhum arquivo o importa.
- Seção nova: componente em `components/site/`, texto em `content/site.ts`, menu em `site.nav`, montagem em `app/page.tsx`. Antes, leia `docs/padroes-tecnicos.md` (seção 13).
- Subagentes de revisão (só para desenvolvimento): `.claude/agents/`.

## Regras de trabalho
- Responda em português (pt-BR). Um item por vez: implementar, verificar, mostrar o resultado, esperar o "ok" e só então commitar e dar push.
- Nunca commite nem dê push sem "ok" explícito. Aviso automático, como "há mudanças não commitadas", não é confirmação.
- A `main` é o que o Hostinger publica. Envios para ela só com "ok", e sempre como avanço normal. Sem PR, a menos que peçam. Force-push só com autorização explícita e `--force-with-lease`.
- Commits: assunto no imperativo, corpo curto, sem `Co-Authored-By` nem nome de modelo, com o trailer `Claude-Session`. Regras em `CONTRIBUTING.md`.
- Hook `commit-msg` e notas de versão ainda não existem: a regra de autoria vale por conduta. Quando existirem, valide antes do push guardando o código de saída (`rc=$?`), sem pipe.
- Siga `docs/diretrizes-de-trabalho.md`. Ao fim de cada entrega (depois do push), registre uma sugestão em `docs/melhorias-do-sistema.md`.
- Diga sempre o que **não** foi testado (aparelhos reais, Safari, Firefox, leitor de tela, WhatsApp real, publicação).
- Publicação: Hostinger, aplicação Node.js ligada à branch `main`. Detalhes em `docs/deploy.md`.

## Como responder
Explique como se falasse com uma pessoa de 15 anos que nunca programou. Em toda resposta inclua:
- **O que eu fiz:** em português simples, sem jargão.
- **O que você precisa fazer:** passo a passo, supondo que a pessoa nunca viu aquilo antes.
- **Por quê:** uma frase dizendo o que aquilo faz ou por que importa.
- **Próximo passo:** uma única ação clara.
- **Erros:** se algo deu errado, explique de forma simples e diga como corrigir.

Quando houver ferramenta externa ou termo técnico, diga onde achar o que precisa e explique em uma frase o que cada configuração faz. Seja conciso.

## Como verificar no navegador
- Teste em 390 px e 1440 px, sem erro de JavaScript e sem rolagem horizontal.
- Chromium e Playwright já vêm no ambiente de nuvem (`/opt/pw-browsers`): não rode `playwright install`. Para o WebGL da abertura em modo headless, use `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.
- Role em passos curtos (cerca de 120 px): rolagem rápida demais deixa blocos sem revelar, e isso é do teste, não da página.
- Para parar o servidor, mate pelo PID. `pkill -f` com o texto do próprio comando casa o shell e encerra com código 144.

## Armadilhas
- `pkill -f "next start"` encerrou o próprio terminal (código 144). Causa: o padrão aparece no comando. Correção: mate pelo PID.
- O Tailwind (preflight) zera o peso de `h1` a `h4`, e o visual perdia o negrito. Correção: `font-weight: 700` em `app/landing.css`.
- O compilador de CSS descartou o `backdrop-filter` quando havia uma cópia `-webkit-` ao lado. Correção: escreva só a versão sem prefixo; o prefixo é gerado sozinho.
- `opacity` em texto de etapa pendente reprovou o contraste (1,8:1). Correção: use cor, não opacidade.
- O Turbopack falhou no build do Hostinger ao processar o CSS. Correção: o script `build` usa `next build --webpack`.
- O ESLint 9 com `eslint-plugin-react-hooks` v7 acusa `setState` dentro de efeito. Correção: texto ou classe que não precisa de estado vai direto ao DOM (`textContent`, `classList`).
- Depois de trocar de branch, o aviso "changed on disk" mostra versões antigas: é a árvore do branch que está em uso, não uma edição sua.

## Estado
Atualizado em 2026-10-10. Branch de trabalho `claude/nifty-turing-sni5k5` (atrás da `main`). Publicado na `main`: `e851dee` (lint com ESLint 9, correções de contador e revelação, remoção de dependências sem uso). Pendências de conteúdo: WhatsApp, e-mail, redes, razão social e CNPJ são placeholders; os 3 projetos são exemplos demonstrativos; política de privacidade é rascunho. Premissas: o visual original é o do HTML v4 (o link do v0 não pôde ser aberto). Adiados: painel administrativo (depende de escolher CMS ou painel próprio), formulário, scripts do kit (`CONTRIBUTING.md`), migração para o ESLint 10 (depois de 20/10/2026), e o commit de marco.

# Especificação do projeto: AIM

Documento de referência: o que o sistema é, como está organizado e quais regras cumpre. Reflete a branch `main` em 2026-10-10. Regras de trabalho estão em `CLAUDE.md` e `docs/diretrizes-de-trabalho.md`. Commits e notas de versão estão em `CONTRIBUTING.md`.

O escopo do MVP (landing page e painel administrativo) vem do documento "Projeto da landing page de soluções digitais", versão 1.0, de 9 de outubro de 2026. Este arquivo descreve o que **existe hoje**. O que é só planejado aparece marcado como "planejado".

## 1. Visão geral

| Frente | Para quem | O que faz |
|---|---|---|
| Site público | visitantes (profissionais e pequenos negócios, hipótese a validar) | Apresenta serviços, exemplos e processo, e leva ao contato pelo WhatsApp. Existe. |
| Painel administrativo | até 3 administradores | Edita textos, imagens, links e publica com rascunho e prévia. **Planejado**, não existe. |

## 2. Stack e arquitetura

- **Frontend:** Next.js 16 (App Router, páginas estáticas), React 19, TypeScript 5 (`strict`), Tailwind CSS 4. Tema próprio em `app/landing.css` (tokens do HTML de referência). `app/globals.css` faz a ponte com os nomes do shadcn; nenhum componente do shadcn está instalado.
- **Fontes:** Schibsted Grotesk, Instrument Sans e JetBrains Mono, por `next/font/google`. São baixadas no build e servidas pelo próprio site: o visitante não faz requisição ao Google.
- **Backend, banco e autenticação:** não existem. Planejados, com escolha entre CMS existente e painel próprio ainda em aberto.
- **Terceiros:** link `wa.me` do WhatsApp (sem chave, sem API).
- **Estado no cliente:** estado local em componentes e o hook `hooks/use-reveal.ts`. Sem biblioteca de estado.
- **Conteúdo:** um único objeto em `content/site.ts`, na estrutura que o painel futuro deve editar.

```
app/            páginas (`/`, `/politica-de-privacidade`), layout, estilos (`landing.css`, `globals.css`), ícone (`icon.svg`)
components/     `site/` (seções e efeitos), `reveal.tsx`, `split-heading.tsx`
content/        `site.ts`: textos, contatos e itens exibidos
hooks/          `use-reveal.ts`
lib/            `utils.ts` (cn), `whatsapp.ts` (link do WhatsApp)
scripts/        `check-publicacao.mjs` (lista o que falta antes de publicar)
docs/           regras de trabalho, padrões, modelos e deploy
raiz            `eslint.config.mjs` (lint), `package.json`, `next.config.mjs`
```

## 3. Perfis e acesso

Não se aplica hoje: o site é público e não tem contas. Planejado: até 3 contas de administração por convite, sem cadastro público, com autorização verificada no servidor em cada operação.

## 4. Telas e funcionalidades

| Tela (rota) | O que entrega | Regras |
|---|---|---|
| Página inicial (`/`) | Abertura com demonstração animada, números, serviços, canais, projetos, como funciona e contato | Seções com âncoras `#inicio`, `#servicos`, `#projetos`, `#como-funciona`, `#contato`. Tema claro e escuro pela preferência do sistema. Sem JavaScript ou com movimento reduzido, tudo fica estático e visível. |
| Política de privacidade (`/politica-de-privacidade`) | Rascunho com aviso e e-mail de contato | Texto definitivo depende da coleta real de dados. |

Regras de interface: alvos de clique de 44 px ou mais, foco visível, contraste de 4,5:1 medido no DOM, exemplos de projeto sempre rotulados "Exemplo demonstrativo".

## 5. API

Não se aplica: não há rotas de API.

## 6. Modelo de dados

Não se aplica hoje. Planejado (modelo mínimo do documento do projeto): configurações do site, seções, serviços, projetos, arquivos de mídia, usuários autorizados e versões de publicação.

## 7. Segurança e privacidade

- **Segredos:** nenhum existe. Quando houver, só no servidor.
- **Coleta de dados:** o site não tem formulário, cookie nem rastreamento. O contato acontece fora do site, no WhatsApp ou no e-mail.
- **Indexação:** `robots: noindex` enquanto for prévia. Remover no dia do lançamento (`app/layout.tsx`). `pnpm check:publicacao` acusa isso.
- **Cabeçalhos HTTP e CSP:** não configurados. Adiado até a escolha da plataforma.
- **Links externos:** `target="_blank"` com `rel="noopener noreferrer"`. Redes sem endereço aparecem como texto, não como link.
- **Auditoria e limites de taxa:** não se aplicam sem painel nem API.

## 8. Build, deploy e notas de versão

- **Comandos:** `pnpm lint`, `npx tsc --noEmit`, `pnpm build`, `pnpm start -p 3000`, `pnpm check:publicacao`, `pnpm dev` (não exige nada).
- **Build:** `pnpm build` usa o Webpack (`next build --webpack`), porque o Turbopack falhou no ambiente de build do Hostinger.
- **Publicação:** Hostinger, aplicação Node.js ligada à branch `main`. Detalhes em `docs/deploy.md`.
- **Notas de versão:** formato em `CONTRIBUTING.md`. A automação ainda não existe.

## 9. Testes e checagens

Não há testes automatizados. As verificações são scripts e checagens manuais, descritas em `CLAUDE.md`:

| Verificação | Cobre |
|---|---|
| `pnpm lint` | Regras do Next (Core Web Vitals e TypeScript). Meta: 0 erros. |
| `npx tsc --noEmit` | Tipos (0 erros). |
| `pnpm build` | Compilação e geração das páginas estáticas. |
| `pnpm check:publicacao` | Placeholders, `noindex` e política em rascunho. |
| Navegador em 390 px e 1440 px | Erros de JavaScript, rolagem horizontal, tema claro e escuro, movimento reduzido. |
| Medição no DOM | Contraste dos textos e tamanho dos alvos de clique. |

## 10. Configuração

Não há variáveis de ambiente hoje e não existe `.env.example`. Os valores editáveis ficam em `content/site.ts`:

| Valor | Uso | Estado |
|---|---|---|
| `whatsapp.number` e `whatsapp.message` | Destino e mensagem dos botões de WhatsApp | placeholder (`5500000000000`) |
| `email` | E-mail do contato e da política de privacidade | placeholder |
| `socials` | Instagram e LinkedIn | placeholder, sem endereço |
| `company` | Razão social e CNPJ no rodapé | placeholder |
| `name` | Nome exibido | provisório |

## 11. Estado e limitações

- **Pendências de conteúdo e operação:** trocar todos os placeholders acima; definir nome e domínio definitivos; substituir os exemplos demonstrativos por casos reais e autorizados; escrever a política de privacidade.
- **Não validado no ambiente de desenvolvimento:** WhatsApp real, e-mail real, aparelhos reais, Safari e Firefox, leitor de tela, desempenho em conexão lenta.
- **Adiado conscientemente:** painel administrativo (depende de escolher CMS ou painel próprio); formulário e métricas (fase 1 do documento do projeto); migração para o ESLint 10, depois de 20/10/2026, quando a configuração 16.4.0 completar duas semanas.
- **Risco conhecido:** a demonstração do painel na abertura e o número "5 áreas que você edita no painel" falam de um painel que ainda não existe. O bloco está rotulado "Demonstração", e o rodapé avisa que é uma prévia.

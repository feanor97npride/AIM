# Studio da Sanity

Painel para editar o conteúdo da landing page. Fica nesta pasta com dependências próprias: o `pnpm install` da raiz não instala nada daqui.

## Variáveis de ambiente

Todas com prefixo `SANITY_STUDIO_`, porque o Studio as lê no navegador. Por isso não são segredos.

| Variável | Para que serve | Onde pegar |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | Identifica o projeto na Sanity | Página do projeto em manage.sanity.io |
| `SANITY_STUDIO_DATASET` | Nome do conjunto de dados (padrão: `production`) | Página do projeto, em Datasets |
| `SANITY_STUDIO_SITE_URL` | Endereço do site, usado no link "Ver no site" | Domínio publicado |

## Comandos

Rode dentro de `studio/`:

- `pnpm install`: instala as dependências desta pasta.
- `pnpm dev`: sobe o Studio no seu computador, com login.
- `pnpm build`: gera o Studio estático em `dist/`.
- `pnpm deploy`: publica o Studio em `<nome>.sanity.studio`. Só quem administra o projeto deve rodar.
- `pnpm typecheck`: confere os tipos (meta: 0 erros).

## Estrutura

- `schemaTypes/siteSettings.ts`: o documento `siteSettings`, único (singleton, ID fixo). Os nomes dos campos seguem `content/site.ts`, para a migração ser direta.
- `lib/validacao.ts`: regras de formato (WhatsApp, CNPJ, cor hex e contraste mínimo de 4,5 : 1).
- `structure.ts`: o menu do Studio, com um item fixo que abre o documento.
- `sanity.config.ts` e `sanity.cli.ts`: configuração do projeto e da CLI.

## Limites do plano gratuito

Histórico de 3 dias e nenhum registro de quem publicou. Detalhes em `project_specs.md`, seção 11.

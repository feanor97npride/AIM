# Preparar commits e notas de versão

As novidades exibidas no painel (se o projeto tiver essa tela) são extraídas da mensagem do commit e só aparecem depois que a versão correspondente inicia no ambiente publicado. O histórico técnico completo não é enviado ao navegador.

## Marco inicial

Antes do primeiro commit de funcionalidade, crie um commit com `[MARCO_NOVIDADES]` no corpo. Commits anteriores ao marco não são avaliados. Só entram no manifesto o marco e os commits que descendem dele.

## Commit com novidades para quem usa o sistema

Mantenha o resumo e os detalhes técnicos da mensagem. No final, inclua um bloco para cada mudança que mereça explicação própria:

```text
[NOVIDADES]
Título: <título curto>
Descrição: <o que melhorou e qual o benefício prático, em português simples>
Áreas: <área 1>, <área 2>
[/NOVIDADES]
```

Use linguagem simples. Não inclua nomes de arquivos, detalhes de implementação, dados de pessoas nem informações internas. `Título` e `Descrição` são obrigatórios. `Áreas` recebe uma ou mais áreas separadas por vírgula. Repita o bloco quando um commit tiver mudanças distintas.

## Commit sem mudança visível

```text
[SEM_NOVIDADES]
Justificativa: <por que não há mudança perceptível>
[/SEM_NOVIDADES]
```

A justificativa serve só para validação e não é exibida. Não combine `[SEM_NOVIDADES]` com `[NOVIDADES]`.

## Ativar a validação local

Rode uma vez em cada checkout, porque clones novos não trazem essa configuração:

```sh
git config core.hooksPath .githooks
```

O hook valida as mensagens novas depois do marco. Commits de merge ficam dispensados. A verificação do CI também confere o histórico desde o marco. Mensagens anteriores ao marco são preservadas e não são reavaliadas.

## Autoria e modelo

O hook `commit-msg` recusa linhas de autoria ou de modelo: `Co-Authored-By`, `Assisted-By`, `Generated-By`, `Model:`, rodapés gerados por ferramenta e endereços de e-mail do fornecedor do modelo. Citar o nome de um modelo no texto do corpo é permitido. Os rótulos acima não.

Commits feitos em sessão de assistente de código terminam com um único trailer de sessão (ex.: `Claude-Session: <link da sessão>`). Fora de sessão, o trailer não é exigido.

`pnpm release-notes:validate` aplica a mesma regra aos commits ainda não enviados (`@{u}..HEAD`), para pegar o erro antes do push mesmo com o hook desligado. Teste a política com `pnpm commit-policy:check`.

## Build e publicação

`pnpm build` gera `.release-notes-manifest.json` com os commits alcançáveis por `HEAD`, a partir do marco. Um commit de merge sem bloco é registrado como sem novidades. Se tiver bloco, o bloco precisa estar correto. O servidor importa o manifesto ao iniciar em produção, por isso a novidade só aparece depois da publicação. Um identificador estável por commit evita duplicação em builds repetidos.

A versão exibida é `build-` seguido dos 12 primeiros caracteres do commit publicado. Se a publicação usar versão comercial, defina `APP_VERSION` com a versão-base (ex.: `1.2.0`). O identificador do commit é acrescentado (`1.2.0+<hash-curto>`).

Sem histórico Git (checkout raso ou sem `.git`) e fora do CI, o build avisa e segue sem novidades em vez de abortar. Detalhes e alternativas estão em `docs/deploy.md`.

Para outro ambiente de publicação, gere o arquivo num checkout completo e inclua `.release-notes-manifest.json` no material do servidor. `RELEASE_NOTES_MANIFEST` aponta para esse arquivo durante o build. Em execução, use `RELEASE_NOTES_MANIFEST_RUNTIME` se ele não estiver na raiz. Se o CI disponibilizar o manifesto como artefato por commit, a etapa de deploy pode baixá-lo do mesmo commit. O manifesto contém só versões e textos destinados ao painel, sem mensagens técnicas completas.

## Verificações

```sh
pnpm release-notes:check
pnpm release-notes:validate
```

Um bloco incompleto interrompe a validação ou o build com uma mensagem que indica como corrigir a mensagem do commit.

## Estado neste projeto

Ainda não existem: o hook `commit-msg`, os scripts `release-notes:*` e `commit-policy:check`, o manifesto no build e o commit de marco. Até serem implementados, valem só as regras de autoria e de trailer de sessão, seguidas por conduta. Não crie o marco `[MARCO_NOVIDADES]` antes dos scripts: sem eles, nada o valida. Detalhes em `CLAUDE.md` (seção "Estado").

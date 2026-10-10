# Modelo de documentação de entrega

Use um arquivo por entrega, com o nome `docs/<id>-<tema>.md`. Preencha todas as seções. Se uma não se aplicar, escreva "Não se aplica" e o motivo.

---

## Escopo entregue

O que mudou, em frases curtas. Escreva para quem usa o sistema e para quem vai dar manutenção. Se a entrega tiver etapas, liste-as em ordem.

## Decisão técnica

A abordagem escolhida e o motivo, em uma ou duas frases. Se houve alternativas descartadas, liste uma por linha, com o motivo da exclusão.

## Preservação

O que continua igual de propósito: regras, cálculos, permissões, dados existentes e pontos de integração. Uma entrega de reorganização precisa provar que nenhuma regra mudou. Liste os nomes das funções, rotas ou arquivos que foram mantidos.

## Validação

| Validação | Resultado |
|---|---|
| `npx tsc --noEmit` | |
| `pnpm build` | |
| Navegador em 390 px e 1440 px | |

Registre o resultado real. Teste que falhou ou não foi rodado aparece como falhou ou não foi rodado. Não arredonde para verde.

## Homologação manual

Passos numerados, do ponto de vista de quem usa o sistema, com a conta e o aparelho necessários. Inclua no mínimo:

1. entrar com cada tipo de conta (com e sem permissão) e conferir o que cada um vê;
2. repetir em celular e em computador;
3. quando houver envio pendente, conferir o comportamento sem rede e depois da reconexão.

## Limitações e riscos

- O que não foi testado nesta entrega (login real, e-mail real, banco de produção, serviço externo, plataforma de publicação).
- Riscos conhecidos e o sinal que confirma ou desmente cada um.

## Rollback

Como desfazer: reverter o commit ou a branch, desligar a configuração ou restaurar a versão anterior. Diga se houve mudança no banco e se ela é reversível (regra 8 de `docs/diretrizes-de-trabalho.md`).

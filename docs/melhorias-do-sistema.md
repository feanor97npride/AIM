# Melhorias do sistema

Fila de sugestões de melhoria. Cada entrega acrescenta **uma** sugestão concreta (regra 5 de `docs/diretrizes-de-trabalho.md`). Nada daqui é implementado sem o "ok", como qualquer outro item. Quando houver mais de 15 itens abertos, priorize ou descarte.

Formato de cada entrada:

```
## AAAA-MM-DD · <entrega que originou>
- Sugestão: ...
- Ganho: ...
- Esforço: P (horas) | M (1 a 2 dias) | G (3+ dias)
- Status: aberta | aceita | descartada | feita (<commit>)
```

## 2026-10-10 · Visual do HTML de referência na landing page (16c82f8)
- Sugestão: transformar em script do projeto (`pnpm a11y:check`) a medição que foi feita à mão nesta entrega: contraste de todos os textos no DOM real, em tema claro e escuro, e tamanho dos alvos de clique em 390 px e 1440 px.
- Ganho: a regra 9 ("contraste medido com ferramenta, não a olho") passa a ser verificada em segundos antes de cada entrega. Nesta entrega a medição achou 33 reprovações que a leitura visual não pegou.
- Esforço: P (horas)
- Status: aberta

## 2026-10-10 · Instalação do kit de processo (59f66a6)
- Sugestão: implementar o hook `commit-msg` e o script `pnpm release-notes:validate`, que `CONTRIBUTING.md` e o agente `notas-versao` já citam e que hoje não existem. Com isso, a recusa de `Co-Authored-By` e de nome de modelo deixa de depender só de conduta.
- Ganho: um commit com nome de modelo passa a ser recusado antes do push, em vez de depender de quem escreve a mensagem. Hoje a regra do kit não tem checagem automática.
- Esforço: P (horas)
- Status: aberta

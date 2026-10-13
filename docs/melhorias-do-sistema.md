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

## 2026-10-10 · Atualização da documentação com o estado real (6dd7b29)
- Sugestão: criar um script `pnpm docs:check` que confere, nas docs, os caminhos de arquivo e os comandos `pnpm` citados, e falha se algum não existir no `package.json` ou no repositório.
- Ganho: nesta entrega, a documentação citava uma pasta (`components/ui`) e um arquivo (`components/section-heading.tsx`) que já tinham sido removidos. Um script assim pega essa divergência antes do envio, em vez de depender de uma busca manual.
- Esforço: P (horas)
- Status: aberta

## 2026-10-10 · Studio da Sanity (4a5aaa6)
- Sugestão: criar `pnpm studio:check`, que roda a checagem de tipos do Studio e os casos das regras de formato de `studio/lib/validacao.ts` (WhatsApp, CNPJ e cor com contraste mínimo), e falha se algum caso mudar de resultado.
- Ganho: nesta entrega, os 12 casos de formato foram conferidos com um script temporário, fora do repositório. Sem um script no projeto, uma mudança futura numa regra pode quebrar uma validação sem aviso.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Conferência de publicação da Sanity no site (4345952)
- Sugestão: criar `pnpm publicacao:verificar`, que lê o documento publicado na Sanity, pede o site ao vivo com um parâmetro que evita o cache e informa se o texto bate, com a hora da leitura.
- Ganho: nesta entrega, a conferência dependeu de capturas de tela. Uma janela normal mostrou um texto antigo que a janela anônima não mostrou, e isso atrasou o diagnóstico. Um script compara as duas fontes sem depender do navegador.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Leitura do conteúdo da Sanity no site (32d70d6)
- Sugestão: criar `pnpm build:verify-content`, que roda o build contra um servidor de conteúdo de teste, compara o HTML gerado com uma referência guardada e falha se o visual ou os textos mudarem sem querer.
- Ganho: nesta entrega, essa comparação, feita à mão, mostrou que o HTML ficou igual ao anterior, exceto os rótulos corrigidos de propósito. Sem um comando, a próxima mudança depende de alguém lembrar de refazer a conferência.
- Esforço: M (1 a 2 dias)
- Status: aberta

## 2026-10-13 · Teste automático do botão "voltar ao topo" (18b9014)
- Sugestão: criar `pnpm voltar-topo:check`, que sobe o site e confere se o botão aparece depois de exatamente uma altura de tela, se o clique leva a `scrollY = 0`, se o foco vai para a marca e se o contraste e o alvo de 44 px passam.
- Ganho: nesta entrega, essas medições foram feitas com um roteiro temporário, fora do repositório. Sem um comando do projeto, uma mudança futura no cabeçalho ou no rodapé pode quebrar o botão sem que ninguém perceba. A sobreposição do botão com o fim do rodapé no celular só foi conferida por captura.
- Esforço: P (horas)
- Status: aberta

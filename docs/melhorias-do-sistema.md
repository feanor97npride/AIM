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

## 2026-10-11 · Tipos do Node no typecheck do Studio (0b1e41d)
- Sugestão: registrar `deployment.appId` em `studio/sanity.cli.ts`, com o identificador de app que o `sanity deploy` mostrou ao publicar, para a publicação do Studio não avisar sobre ele a cada vez.
- Ganho: nesta entrega, o deploy terminou com a instrução de colocar esse identificador no arquivo para não perguntar de novo. Com a configuração salva, quem administra o projeto publica o Studio com um comando só.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Contraste do texto nos cartões azuis (f2d971e)
- Sugestão: escrever em `app/landing.css`, ao lado do degradê de `.mini-hero`, um comentário com a razão de contraste do fim da cor (5,31 : 1 para `#3D5BF0`, com texto branco), para que uma troca futura de cor não volte a reprovar sem aviso.
- Ganho: nesta entrega, a cor foi escolhida por cálculo de contraste. Sem um registro no próprio CSS, a próxima troca de cor pode voltar ao 3,06 : 1 que a página tinha antes, sem que ninguém perceba.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Efeitos de hover só com mouse (93601d5)
- Sugestão: criar `pnpm hover:check`, que roda o build, lê o CSS gerado e falha se algum seletor com `:hover` estiver fora de `@media (hover: hover)`.
- Ganho: nesta entrega, a conferência foi feita com um script temporário, fora do repositório. Sem um comando no projeto, uma regra nova de hover escrita fora do bloco volta a aparecer preso no celular sem aviso.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Assunto do e-mail de contato (5308698)
- Sugestão: trazer o assunto do e-mail de contato para o Studio, como campo de `siteSettings`, e usar esse campo nos dois links da seção de contato e no link "E-mail" do rodapé.
- Ganho: nesta entrega, o assunto ficou escrito no código, enquanto o resto da seção vem do Studio. Quem edita o conteúdo não consegue trocar o assunto, e o rodapé continua sem ele.
- Esforço: M (1 a 2 dias)
- Status: aberta

## 2026-10-11 · Interruptor "Exemplo demonstrativo" sem efeito (0051004)
- Sugestão: remover do Studio o interruptor "Exemplo demonstrativo" (`studio/schemaTypes/siteSettings.ts`, linhas 364-370), o campo `isDemonstrative` em `lib/site-content.ts` e publicar o Studio de novo.
- Ganho: nesta entrega, a etiqueta passou a aparecer sempre, então o interruptor não muda mais nada na página. Quem edita o conteúdo pode achar que desligá-lo esconde o rótulo, e isso não acontece.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Página de erro para falhas no layout principal (7b4fee8)
- Sugestão: criar `app/global-error.tsx`, com o mesmo texto e os mesmos botões de `app/error.tsx`, para que uma falha no layout principal também mostre a página em português.
- Ganho: nesta entrega, a página de erro cobre só falhas dentro das páginas. Se o layout principal quebrar, o visitante ainda vê a página padrão em inglês do Next.js.
- Esforço: P (horas)
- Status: aberta

## 2026-10-11 · Marcação de dados provisórios no Studio (5e4b2a6)
- Sugestão: no Studio, marcar cada campo provisório (e-mail, WhatsApp, razão social, redes, aviso do rodapé) com uma opção "provisório", e a checagem de publicação usar essa marcação no lugar da lista fixa de padrões.
- Ganho: nesta entrega, a checagem passou a ler a Sanity, mas ainda depende de uma lista de textos como `seuperfil`. Um dado provisório fora dessa lista passa sem aviso. Com a marcação, a checagem acusa qualquer campo marcado, sem depender do texto.
- Esforço: M (1 a 2 dias)
- Status: aberta

## 2026-10-11 · Medição do shader da abertura (41d46d5)
- Sugestão: criar `pnpm hero:medir`, que sobe o site, mede quadros desenhados, tempo de script e layouts por segundo no celular e no computador, e compara com a última medição guardada.
- Ganho: nesta entrega, a medição foi feita com scripts temporários fora do repositório. No ambiente de teste, o ganho de placa de vídeo não apareceu, e isso só se resolve em aparelho real. Um comando no projeto permite repetir a comparação a cada mudança no shader.
- Esforço: M (1 a 2 dias)
- Status: aberta

## 2026-10-11 · Conferência da ordem dos títulos (070eb40)
- Sugestão: criar `pnpm headings:check`, que sobe o site, lista os títulos da página em ordem e falha se algum pular de nível (por exemplo, de `h1` para `h4`).
- Ganho: nesta entrega, a ordem foi conferida no navegador com um script temporário, fora do repositório. Sem um comando no projeto, um título novo fora de ordem volta sem aviso, e quem usa leitor de tela percebe antes da equipe.
- Esforço: P (horas)
- Status: aberta

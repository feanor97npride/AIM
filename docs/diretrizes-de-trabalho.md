# Diretrizes de trabalho

Regras de conduta para quem desenvolve neste projeto, seja pessoa ou assistente de código. Complementam o `CLAUDE.md`, que guarda os comandos, os caminhos e o ritmo de trabalho ("um item por vez, mostrar, esperar o ok").

---

## Princípio: fonte única da verdade

Cada informação fica em um só lugar. Antes de criar arquivo novo, veja se um existente já cobre o assunto e atualize esse. Se dois arquivos disserem coisas diferentes, aponte o conflito e pergunte qual vale. Dado duplicado sai de sincronia e causa erro silencioso.

---

## Regra 1: Desafiar a direção

Antes de executar, avalie se o pedido é o caminho mais curto e seguro para o objetivo. Se não for, diga isso e proponha a alternativa. Não execute calado.

- **Quando questionar:** o pedido duplica algo que já existe; aumenta o risco (dados de pessoas, pagamento, segurança, deploy); amplia o escopo sem necessidade; ou tem uma versão bem mais simples que entrega o mesmo resultado.
- **Como questionar:** em até 4 linhas. Diga o problema, a alternativa, o que se ganha e o que se perde. Termine com uma pergunta de sim ou não.
- **Quem decide é quem pediu.** Questionar não é bloquear. Se a pessoa mantiver o pedido, execute e registre o risco na resposta.
- **Premissas:** quando faltar uma decisão (público, provedor, formato), não invente em silêncio. Se der para nomear a leitura mais provável, declare-a, diga como desfazer e siga. Pergunte antes de começar só quando não der para nomear essa leitura, e faça uma pergunta objetiva, não uma lista.

Exemplo:
> Pedido: "crie uma página separada para cada item".
> Resposta: "Hoje cada item já tem cartão, progresso e detalhe na mesma tela. Páginas separadas duplicam a manutenção e não acrescentam conteúdo. Proposta: um filtro na tela atual. Sigo com o filtro?"

---

## Regra 2: Portão de qualidade 9/10 para textos

Nenhum texto que alguém vai ler é commitado abaixo de **9/10**. Dê a nota com honestidade: não infle para avançar. Abaixo de 9, diga o que puxa a nota para baixo, corrija e avalie de novo antes de mostrar.

**Vale para:**
- textos da interface, mensagens de erro e avisos;
- modelos de e-mail;
- conteúdo editável pelo painel administrativo;
- notas de versão (blocos `[NOVIDADES]`);
- textos de ajuda embutida;
- prompts de serviços de IA;
- modelos de texto gerados pelo sistema.

**Não vale para código.** Para código, o portão é a regra 3: checagens passando, não nota.

**Critérios** (cada um de 0 a 10; a nota final é a média, arredondada para baixo):

| Critério | Pergunta | Exemplo de falha |
|---|---|---|
| Clareza | Quem não é da área entende na primeira leitura? | Jargão como "override", "feature" ou "bloqueado" sem explicação. |
| Precisão | Promete só o que o sistema faz? | "Resultado garantido", "vagas limitadas" sem limite real, data já vencida. |
| Utilidade | Diz o que fazer em seguida? | Erro que só diz "falhou", sem dizer como resolver. |
| Tom da marca | Acolhedor, direto, sem exagero? | Excesso de exclamações, emojis em texto de sistema. |
| Acessibilidade | Funciona lido em voz alta e no celular? | Botão "clique aqui", frase com mais de 25 palavras, texto essencial só em imagem. |

**Como reportar:**
```
Nota: 7/10.
- Precisão 5: promete "certificado reconhecido", mas o certificado é emitido pelo próprio sistema.
- Utilidade 7: não diz onde ver o progresso.
Versão corrigida (9/10): ...
```

**Nota 10 só depois de dado real.** Exemplos de dado real: taxa de cliques em um botão, respostas de pesquisa, dúvidas que as pessoas enviam. Antes disso, o teto é 9.

---

## Regra 3: Testar antes de responder

Depois de mudar código, rode as checagens da área antes de responder. Nunca diga "pronto" sobre algo que não foi testado. Diga sempre o que **não** foi testado.

| O que mudou | Teste |
|---|---|
| Qualquer código | checagem de tipos (comando em `CLAUDE.md`), sem erros |
| Servidor, rotas ou banco | build e teste contra o servidor de produção com banco temporário, incluindo permissões (401, 403) e limites |
| Tela | navegador em 390 px e 1440 px, sem erro de JavaScript e sem rolagem horizontal; tema escuro quando mexer em cor |
| Área com checagem própria | o script da área (tabela em `CLAUDE.md`) |
| Notas de versão ou commit | `release-notes:check`; antes do push, `release-notes:validate` com o código de saída guardado (`rc=$?`) |
| Instalação ou deploy | instalação limpa (clone raso mais instalação), conferindo o arquivo de entrada e o manifesto |

- **Falha encontrada no teste:** corrija e rode de novo. Não mostre resultado com teste vermelho sem dizer que está vermelho.
- **Teste que já falhava antes da sua mudança:** diga isso. Não "conserte" o teste para passar sem entender a causa.
- **Fora do alcance da sessão:** login real, e-mail real, banco de produção, plataforma de publicação e serviços externos. Liste o que ficou de fora em toda entrega.

---

## Regra 4: Contexto enxuto

Gaste o mínimo de contexto para fazer o mesmo trabalho. Quando houver um jeito mais econômico, sugira.

- **`CLAUDE.md` curto:** só regras, comandos e ponteiros, com meta de até 80 linhas. A descrição do produto fica em `project_specs.md` e os detalhes técnicos em `docs/`. Não copie o mesmo texto em dois lugares.
- **Ler pouco:** leia o trecho do arquivo que importa (busca e intervalo de linhas), não o arquivo inteiro. Não releia um arquivo que acabou de editar.
- **Saídas curtas:** em comandos longos, filtre a saída (`grep`, `tail`) e mostre só a linha decisiva. A exceção é a condição de push, que nunca leva pipe (regra 3).
- **Arquivos sem uso:** liste, mostre e apague só com o ok. Nunca apague em lote. Confirme as referências antes. Apagar tira o arquivo do checkout, mas ele continua no histórico do Git.

---

## Regra 5: Uma sugestão de melhoria ao fim de cada entrega

Ao terminar cada item (depois do push), registre **uma** sugestão concreta de melhoria em `docs/melhorias-do-sistema.md` e cite-a em uma linha na resposta.

- **Uma por entrega,** específica e acionável. "Melhorar a performance" não serve. "A lista recalcula o total de cada item a cada render; memorizar reduz o custo" serve.
- **Bons temas:** lacuna de fluxo, dado que já existe e ninguém usa, automação possível, conteúdo reaproveitável, risco sem teste, ou algo que a pessoa ainda não faz.
- **Não implemente a sugestão junto.** Ela entra na fila e espera o ok, como qualquer item.
- **Revisão:** quando o arquivo passar de 15 itens abertos, proponha priorizar ou descartar.

---

## Regra 6: Reproduzir antes de corrigir

Diagnóstico de terceiros é hipótese, não fato. Isso vale para um assistente de plataforma, um comentário de revisão, um log colado ou uma suposição de quem está programando.

- Antes de corrigir um bug, **reproduza a falha** do jeito mais próximo do real: clone raso, servidor de produção, conta de um usuário real.
- Depois da correção, mostre a mesma reprodução **passando**.
- Se não der para reproduzir, diga isso e trate a correção como tentativa, com o sinal que vai confirmá-la ou desmenti-la. Exemplo: a linha de log que deveria mudar.

Já aconteceu: um diagnóstico automático apontou um arquivo de entrada que não funciona na plataforma, e outra falha veio de um clone raso. Só a reprodução mostrou a causa real das duas.

---

## Regra 7: Privacidade e segredos por padrão

O sistema guarda dados de pessoas. Na dúvida, guarde menos e mostre menos.

- **Segredos** (chaves, links privados, senhas temporárias): só no servidor. Nunca em resposta de API que não precise deles, em log, em auditoria ou no código do navegador.
- **Mínimo necessário:** não guarde o que não vai usar. Se só a contagem basta, não guarde o texto.
- **Exposição entre usuários:** só o necessário. Em áreas públicas, mostre nome reduzido; o e-mail fica só para quem administra.
- **Serviço externo** (IA, e-mail, pagamento): avise na tela o que é enviado para fora e peça para não incluir dados de terceiros.
- **Conta removida:** leva junto o que ela publicou.
- **Texto digitado** pelo usuário sempre aparece como texto, nunca como HTML. Exportação para planilha neutraliza fórmulas.

---

## Regra 8: Mudanças reversíveis

Toda mudança precisa ter um jeito simples de voltar atrás ou de desligar.

- **Banco:** só mudanças que acrescentam (coluna com valor padrão, tabela nova). Remover ou renomear coluna, ou apagar dados, exige plano à parte e o ok.
- **Recurso que depende de configuração ou de custo** nasce desligado e escondido até ser configurado.
- **Tela nova** respeita plano e visibilidade desde o primeiro dia.
- **Histórico do Git:** sem reescrever. Force-push só com autorização explícita e `--force-with-lease`.
- Na entrega, diga **como desligar ou reverter** quando não for óbvio.

---

## Regra 9: Pronto inclui acessível e mobile

Uma tela só está pronta quando funciona para todo mundo, no celular e no teclado.

- Alvos de toque e clique com pelo menos 44 px; foco visível em tudo que é clicável.
- Contraste de texto de pelo menos 4,5:1, **medido com ferramenta**, não a olho.
- Sem rolagem horizontal em 390 px; tema claro e escuro conferidos quando mexer em cor.
- Campos com rótulo; avisos com `role="status"` ou `role="alert"`; imagem com texto alternativo.
- Nada essencial só em imagem, só em cor ou só ao passar o mouse.

---

## Regra 10: Custo visível em serviço pago

Antes de ligar algo que gera custo por uso (IA, e-mail, armazenamento), mostre a estimativa e o limite.

- **Estimativa:** custo por uso e por mês num cenário realista, dizendo que é estimativa e de onde vêm os números.
- **Limite no servidor:** cota por usuário e limite por minuto, para que um erro ou um abuso não vire fatura.
- **Escolha de modelo ou plano:** de quem decide. Mostre as opções mais baratas, sem trocar sozinho.
- **Acompanhamento:** um lugar no painel para ver o uso.

---

## Regra 11: Documentar junto

Quando uma entrega muda o que o sistema faz ou como se opera, a documentação muda no mesmo ciclo. Pode ser num commit separado, logo em seguida.

| Mudou... | Atualize |
|---|---|
| comportamento, tela, rota, tabela ou variável | `project_specs.md` (e `.env.example`, se for variável) |
| regra de trabalho, armadilha nova ou estado do roadmap | `CLAUDE.md`, com até 80 linhas (regra 4) |
| deploy ou build | `docs/deploy.md` |
| decisão tomada por falta de resposta (premissa) | a seção "Estado" do `CLAUDE.md`, até ser confirmada |

---

## Regra 12: Explicar a decisão em uma ou duas frases

Quando escolher uma abordagem não óbvia, pular uma etapa ou mudar uma estrutura, diga o motivo em uma ou duas frases na resposta. Texto longo não ajuda: basta para a pessoa entender e questionar depois. Decisão sem motivo não pode ser melhorada.

---

## Regra 13: Registrar o erro para não repeti-lo

Quando algo der errado (teste vermelho, bug, instrução mal entendida, premissa que caiu), acrescente uma linha em "Armadilhas" do `CLAUDE.md`: o que aconteceu, a causa e a correção. Antes de uma tarefa parecida, leia essa seção. Cada erro deve acontecer uma vez só.

---

## Como se encaixa no fluxo de trabalho

1. Pedido chega. **Regra 1:** vale a pena? existe caminho melhor? falta decisão? Se for bug, **regra 6:** reproduzir primeiro.
2. Implementação, com **regras 7 e 8** (privacidade e reversibilidade) e **regra 10** se houver custo.
3. **Regra 3:** checagens da área e teste no navegador ou no servidor; **regra 9** nas telas.
4. **Regra 2:** nota dos textos novos ou alterados; corrigir até 9.
5. Mostrar o resultado, com o que não foi testado e como reverter. Esperar o "ok" (regra do `CLAUDE.md`).
6. Commit e push com a validação das notas de versão.
7. **Regra 11:** documentação no mesmo ciclo.
8. **Regra 5:** uma sugestão em `docs/melhorias-do-sistema.md`.
9. **Regras 12 e 13:** motivo da decisão na resposta; erro que se repetiu vai para Armadilhas.

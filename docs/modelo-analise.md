# Modelo de análise: proposta x sistema atual

Use para comparar uma proposta, um documento de produto ou um pedido grande com o código existente. Não altere código durante a análise. Ela termina com decisões e um plano, não com mudanças.

---

## 1. Diagnóstico

O que existe hoje, com caminhos de arquivo. Separe o que a proposta pede que já existe (reuso), o que está parcialmente pronto e o que é novo.

## 2. Matriz de comparação

| Item da proposta | Situação atual | Caminho | Decisão |
|---|---|---|---|
| <item> | <existe, parcial ou ausente> | <arquivo> | reaproveitar, ajustar, criar ou descartar |

## 3. Reorganização x funcionalidade nova

Separe o que é só mudança de organização, sem regra nova, do que cria comportamento novo. A reorganização vem primeiro, porque o risco é menor.

## 4. Regras antes de recomendar

Antes de propor qualquer mudança, confira:

- **Orientar x bloquear:** a proposta trava o que o sistema hoje deixa aberto? Prefira destacar o próximo passo a trancar telas.
- **Preservar:** permissões, dados e históricos continuam como estão? Migração destrutiva não entra sem plano próprio.
- **Escopo:** a regra vale por conta, por usuário ou por curso? Se for individual, calcule a partir dos dados já gravados, sem começar do zero.
- **Prova:** como cada etapa ou selo é comprovado? Se a prova depende de avaliação humana, isso vira fila de trabalho para quem avalia. Fica fora da primeira entrega.
- **Decisões de negócio ou de conteúdo** (certificado, preço, texto jurídico) são de quem é dono do produto. Não as implemente sem decisão.
- **Dados pessoais e imagens:** exigem consentimento explícito, opção de remoção e padrão privado.
- **Comunicações** (newsletter, pesquisa, mensagens automáticas): adesão voluntária, com caixa desmarcada por padrão e forma clara de sair.
- **Medição:** registre só o que a regra do projeto permite. Decida a privacidade antes de começar a medir.

## 5. Sequência de entregas

Para cada entrega, registre:

- **Escopo:** o que entra, em frases curtas.
- **Benefício:** o que muda para quem usa.
- **Esforço:** P (horas), M (1 a 2 dias) ou G (3+ dias).
- **Riscos:** o que pode quebrar, sobretudo acessos e regras existentes.
- **Critério de aceite:** verificável. Exemplos: "todas as telas continuam alcançáveis em até dois toques"; "lint e checagens da área passam"; "capturas em 390 px e 1440 px".

## 6. Ações recomendadas

Uma ação por vez, na ordem, com o "ok" entre elas. Cada ação traz:

- o prompt pronto para executar;
- a validação que deve passar;
- a lista do que não foi testado.

## 7. Itens para decidir

Perguntas objetivas para quem é dono do produto, uma por linha, com a opção recomendada. Não precisam de código para ser respondidas.

# Padrões técnicos reaproveitáveis

Soluções que funcionaram num projeto real e que tendem a se repetir. Antes de criar uma solução nova para um desses problemas, leia o padrão. Não é obrigatório aplicar todos: aplique o que o projeto precisa, e registre no `project_specs.md` as escolhas feitas.

## 1. Um cálculo, uma fonte

**Problema:** o mesmo número (progresso, total, preço) aparece em várias telas e diverge.

- Uma única função calcula o valor; todas as telas recebem o mesmo resultado.
- Em telas específicas, mostre o valor geral e, no texto auxiliar, o detalhe da categoria daquela tela.
- Se a regra de cálculo mudar, mude a versão do modelo (seção 2).

## 2. Progresso por eventos, não por campo

**Problema:** um campo "percentual" sobrescrito perde o histórico e não explica as mudanças.

- **Eventos imutáveis:** guarde cada fato (ex.: concluiu, desfez conclusão) em ordem, com data, dispositivo e identificador. Não edite eventos antigos.
- **Estado atual é projeção:** o último evento válido por item vence. Desfazer é um evento novo, não um apagamento.
- **Versionamento:** a regra de cálculo tem uma versão do modelo; o catálogo de conteúdo tem uma versão própria. Mudou a regra, sobe a versão do modelo e recalcula. Mudou o catálogo, sobe a versão do conteúdo. Não misture eventos de versões incompatíveis.
- **Item sem conteúdo elegível sai do denominador.** Conteúdo inexistente não vira 0% artificial.
- **Pesos:** dentro de cada categoria, os itens valem igual. O geral é a média ponderada das categorias que têm conteúdo.
- **Conclusão não é posição:** "onde parei" é um marcador de retomada, separado. Abrir uma tela ou pausar um vídeo nunca altera o percentual.

**Sincronização entre dispositivos:**

- O servidor usa o usuário da sessão autenticada, nunca o identificador enviado pelo cliente.
- O envio é em lote e cada evento tem identificador próprio, então reenviar não duplica.
- Empate entre dispositivos se resolve por uma ordem fixa: data do evento, depois identificador do dispositivo, depois identificador do evento. Assim, dois clientes chegam ao mesmo resultado.
- Offline, a alteração fica numa fila local, a interface continua usável e o envio refaz ao voltar a rede.
- Ao sair da conta, descarte o estado em memória. O cache seguinte fica indexado pelo identificador do usuário, para não vazar entre contas no mesmo navegador.

**Estados de tela:** `loading` (indicador), `offline` (mantém o último estado e avisa que há envio pendente), `error` (mantém o último estado e avisa que a atualização falhou) e `ready`.

## 3. Migração do armazenamento local

**Problema:** dados antigos no navegador (de antes do login) precisam entrar na conta sem misturar com outra pessoa.

- Rode a migração depois do login, sem bloquear o acesso.
- Um registro (ledger) versionado diz o que já foi migrado, por usuário. Não migre duas vezes.
- Antes de mudar qualquer coisa, guarde backup local da chave antiga.
- Se os dados locais pertencem a outra conta, bloqueie a migração. Nunca atribua automaticamente.
- Trate cada item: vazio (pular), válido (importar), duplicado (consolidar por identificador), corrompido (ignorar e registrar), offline (manter pendente), de outro dono (bloquear).
- Remova as chaves antigas só depois que o registro confirmar a migração (remoção gradual).

## 4. Arquivo privado com metadados no banco

**Problema:** arquivos de referência (PDF, anexos) não devem ir para o banco nem para o código.

- O conteúdo binário fica em armazenamento privado. O banco guarda só metadados: nome para exibição, tamanho, hash, versão e status.
- A chave do objeto usa um identificador interno. O nome original serve só para exibição e para o cabeçalho de download.
- Se o arquivo é a fonte de verdade, ele não é convertido, recomprimido nem refeito. Sirva o arquivo recebido.
- Upload com objeto novo, sem sobrescrever. Confira a integridade depois de gravar. Se gravar os metadados falhar, remova o objeto.
- Uma versão publicada por escopo (ex.: por curso), garantida por índice único parcial. Versões antigas ficam arquivadas e podem voltar sem apagar o objeto.

## 5. Autosave e formulários em etapas

**Problema:** formulários longos perdem dados, ou confundem quem preenche.

- Rascunho salvo no navegador a cada alteração, com retomada ao reabrir.
- Voltar entre etapas preserva o que foi preenchido.
- Antes de descartar conteúdo (criar nova ficha, carregar um registro antigo), peça confirmação se houver alterações não salvas.
- Mostre o resumo essencial em todas as etapas. O resultado só aparece depois de validado.
- No salvamento definitivo, não diga "salvo" enquanto o servidor não confirmar o registro.
- A propriedade do registro vem da conta autenticada, nunca de um campo enviado pelo cliente.

## 6. Exportação centralizada

**Problema:** cada tela gera seu PDF ou sua impressão de um jeito, com botões repetidos.

- Um único modal concentra a exportação de todos os documentos. Ele informa o documento, o conteúdo e o formato antes de gerar.
- Durante a geração, mostre progresso quando possível. Em erro, ofereça "Tentar novamente".
- Bloqueie fechar ou cancelar enquanto o arquivo está sendo criado, para não deixar estado interrompido.
- Telas deixam só acessos contextuais. Fórmulas e a estrutura do documento não mudam ao centralizar.

## 7. Importação em duas etapas

**Problema:** importar direto no banco não dá chance de conferir o resultado antes de salvar.

- O arquivo é processado para uma **prévia**. Nada é salvo até a pessoa confirmar.
- Campos não reconhecidos ficam sinalizados. Trechos não classificados continuam na prévia para revisão.
- Itens que já existem não são duplicados. Itens novos entram no lugar certo.
- Se o nome do arquivo não identifica o destino, a pessoa escolhe manualmente.

## 8. Acesso por plano e visibilidade

- A regra vale no cliente e no servidor. O cliente só esconde ou mostra; quem decide é o servidor.
- Recurso oculto para todos: não aparece. Recurso fora do plano: aparece com cadeado e aviso de upgrade.
- Dado bloqueado não é enviado ao navegador. Módulo bloqueado chega sem o conteúdo; vídeo cujos módulos estão todos fechados chega sem endereço.
- Recurso que depende de configuração ou de pagamento nasce desligado e escondido até ser configurado.
- Recurso novo não entra sozinho em planos que têm lista escolhida à mão. Marque manualmente ou defina a regra padrão.
- Links privados (grupos, salas, arquivos) só saem na rota de quem tem direito, com validade quando houver. Nunca aparecem em listagem pública nem em auditoria.

## 9. Conteúdo editável pelo painel

**Problema:** textos e listas mudam sem deploy, mas o código precisa de um padrão.

- O conteúdo padrão fica no código. O painel salva sobrescritas no servidor, e o site usa a sobrescrita quando existir.
- Textos de rótulo ficam num registro central (fonte única). Uma tela não redefine rótulos por conta própria.
- Cada seção do painel tem ajuda embutida: para que serve, passos, resultado esperado e cuidados.
- Ações administrativas e de moderação ficam numa trilha de auditoria.

## 10. Entrada, saída e texto de usuário

- Toda rota que recebe corpo valida o formato no servidor, com esquema, e tem limite de tamanho.
- Limite de taxa em login, relatos de erro e denúncias, e em qualquer serviço pago (seção 11).
- Texto digitado por usuários é exibido como texto, nunca como HTML.
- HTML vindo de e-mail vai para um `iframe` com `sandbox`, nunca para `dangerouslySetInnerHTML`.
- Links vindos de usuário só aceitam `https://` ou caminho interno. Valide no cliente e no servidor.
- Exportação para planilha neutraliza fórmulas: células que começam com `=`, `+`, `-` ou `@` são tratadas como texto.

## 11. Limites para uso abusivo e custo

- Serviço pago tem cota por usuário e limite por minuto, no servidor.
- Quando a regra precisa valer entre reinicializações, conte no banco, não em memória.
- Se só a contagem basta, não guarde o texto da pergunta ou do envio.
- Se o serviço externo falha ou recusa a resposta, devolva a cota gasta.

## 12. Conteúdo público de usuários

- Só texto. Publicação sem aprovação prévia, com moderação depois da publicação.
- Denúncia por usuário e alvo, com limite de envios por hora.
- Quem publicou pode apagar o próprio conteúdo.
- Nome público reduzido (primeiro nome e inicial). O e-mail fica só para quem administra.
- Excluir a conta remove o que ela publicou.

## 13. Interface acessível

- **Abas:** `role="tab"`, `aria-selected` e `aria-controls`. Navegação por setas, `Home` e `End`.
- **Carrossel:** navegável por teclado e por toque. Cards fora da área visível ficam com `inert` e `aria-hidden`, para que os controles deles não recebam foco. Se uma rolagem tirar o card focado da área visível, o foco volta para o trilho.
- **Comparação ampliada** (antes e depois): fecha com `Escape`, leva o foco para dentro ao abrir, mantém `Tab` e `Shift+Tab` dentro do diálogo e devolve o foco ao botão que o abriu.
- **Movimento reduzido:** se a pessoa pede menos movimento, desligue a rolagem animada.
- **Filtros combinados:** busca e filtros aparecem antes de qualquer banner textual longo, com a contagem de resultados.
- **Conferência:** teste com teclado e com toque em 320, 390, 768 e 1440 px.

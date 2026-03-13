# Guia de Diagnóstico - Questões Não Aparecem

## 🔍 Verificação Rápida (Consola do Browser)

Abra a consola ( F12 > Console ) e execute estos comandos:

```javascript
// Ver dados atuais
debugShowData()

// Adicionar questões de teste AGORA
debugAddTestQuestions()

// Recarregar a página (vai aparecer as questões de teste)
location.reload()

// Limpar dados e recomeçar
debugClear()

// Tentar carregar do Google Sheet
carregarQuestoesDoSheet()
```

## 📋 Checklist Completo

### 1️⃣ Verificar Google Sheets

- [ ] Abrir o Google Sheet
- [ ] Ir para a aba **"REGISTOS"**
- [ ] Verificar headers: `ID | DEPARTAMENTO | Investigação (Questão de Auditoria) | Foco / Requisito`
- [ ] Verificar se há dados na coluna A (não vazio)
- [ ] Exemplo de linha de dados:
  ```
  Q1 | DCO | Existe registo de pedidos? | Rastreabilidade
  ```

### 2️⃣ Verificar AppScript URL

- [ ] Copiar URL de deployment do AppScript (no Google Sheet > Extensões > Apps Script > Deploy)
- [ ] Formato correto: `https://script.google.com/macros/s/[ID_MUITO_LONGO]/exec`
- [ ] Abrir no HTML ([index.html](index.html) linha ~476)
- [ ] Comparar: `const APPSCRIPT_URL = '...'`
- [ ] Se diferentes, **atualizar o URL**

### 3️⃣ Verificar AppScript Logs

- [ ] Google Sheet > Extensões > Apps Script
- [ ] Lado esquerdo > Clique em "Execução"
- [ ] Procurar por logs recentes
- [ ] Procurar por erros vermelhos
- [ ] Se houver erro "sheet 'REGISTOS' not found" > criar a aba REGISTOS

### 4️⃣ Verificar Browser Console

- [ ] F12 ou Ctrl+Shift+I
- [ ] Ir à aba **Console**
- [ ] Procurar por erros vermelhos
- [ ] Procurar por mensagens com "RenderQuestoes", "Carregamento", "Questões carregadas"
- [ ] Se vir CORS error > o AppScript precisa de ser redeployado

### 5️⃣ Teste Prático - Adicionar Questão Manualmente

1. Abrir a aplicação
2. Clicar em "Questões"
3. Clicar em "+ Nova Questão"
4. Preencher:
   - **Departamento**: DCO
   - **Questão**: "Existe registo de pedidos de compra?"
   - **Foco**: "Rastreabilidade de compras"
5. Clicar "+ Adicionar"
6. **Resultado esperado**: Questão aparece imediatamente

Se **aparecer agora** = o localStorage está funcionando mas o Google Sheet não
Se **não aparecer** = problema na salvação local

### 6️⃣ Teste de Carregamento do Sheet

1. Em "Questões", clicar no botão **"⟲ Recarregar"**
2. Abrir console (F12)
3. Procurar mensagens tipo:
   - `"RenderQuestoes - Questões disponíveis: Array(0)"`
   - `"Questões carregadas do sheet: [...]"`
   - Erros com CORS

## 🛠️ Principais Causas & Soluções

| Problema | Causa | Solução |
|----------|-------|---------|
| **Mensagem "Nenhuma questão"** | Sem questões nos dois (Sheet + localStorage) | Adicione uma questão manualmente via "+ Nova Questão" |
| **Questões aparecem mas com ID "Q"** | Dados vindos do localStorage (antigos) | Reload do sheet via "⟲ Recarregar" |
| **CORS Error no console** | AppScript está bloquando requisições | Redeployar AppScript com "Qualquer um" como acesso |
| **Error "Sheet 'REGISTOS' not found"** | Aba REGISTOS não existe no Google Sheet | Criar aba "REGISTOS" manualmente |
| **Questões aparecem no Sheet mas não na app** | URL do AppScript desatualizado | Copiar novo URL do deployment |
| **Dados desaparecem ao recarregar** | localStorage corrompido | Enter `debugClear()` na consola |

## 📍 Localizações Importantes

| Item | Onde Encontrar |
|------|-----------------|
| **AppScript Logs** | Google Sheet > Extensões > Apps Script > Execução (side panel) |
| **Browser Console** | F12 > Console |
| **APPSCRIPT_URL** | [index.html](index.html#L476) linha ~476 |
| **localStorage data** | F12 > Application > Local Storage > [seu domínio] > chave "auditData" |
| **Sheet REGISTOS** | Google Sheet > abas no fundo |

## ✅ Fluxo Esperado

```
1. Página carrega
   ↓
2. localStorage é lido
   ↓
3. AppScript é contatado para obter questões
   ↓
4. Se sucesso: dados do Sheet são usados
   Se falha: dados do localStorage sãousados
   ↓
5. Questões são renderizadas na tela
   ↓
6. User vê a lista de questões por departamento
```

## 🆘 Se nada funcionar

1. Execute no console:
   ```javascript
   debugAddTestQuestions()
   location.reload()
   ```

2. Verifique se questões de teste aparecem

3. Se **teste não aparecer**, o problema está em `renderQuestoes()` ou localStorage

4. Se **teste aparecer**, o problema está no carregamento do Google Sheet

---

**DICA**: A maioria das vezes é porque a URL do AppScript está errada ou o Sheet REGISTOS não existe.



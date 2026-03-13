# 🚀 Como Redeployar o AppScript

## ⚠️ IMPORTANTE: Mudanças Feitas
Foram adicionados **headers CORS** ao `doGet()` e criada uma função `doOptions()` para resolver o erro CORS.

Para as mudanças entrarem em vigor, **DEVE redeployar o AppScript**.

---

## 📍 Passo a Passo para Redeployar

### 1. Abrir o Google Sheet
```
https://docs.google.com/spreadsheets/d/[SEU_ID]/edit
```

### 2. Abrir o Script Editor
- Menu: **Extensões**  >  **Apps Script**

### 3. Copiar o Código Novo
- Ficheiro: [appscript.gs](appscript.gs)
- Selecionar todo o conteúdo
- Copiar (Ctrl+C ou Cmd+C)

### 4. Colar no Script Editor
- Google Sheet > Apps Script
- **Apagar todo o código existente**
- Colar o novo código (Ctrl+V ou Cmd+V)
- **Guardar** (Ctrl+S ou Cmd+S)

### 5. Fazer Deploy Novo
- Botão **"Deploy"** no canto superior direito
- Selecionar: **"New deployment"** (ou "Manage deployments" se já existe um)
- Tipo: **"Web app"**
- Executar como: [sua conta Google]
- Quem tem acesso: **"Qualquer um"** (importante!)
- Clicar **"Deploy"**

### 6. Copiar Novo URL
- Vai aparecer um popup com o novo URL
- Copiar o URL de deployment

### 7. Atualizar URL em index.html
- Ficheiro: [index.html](index.html)
- Procurar: `const APPSCRIPT_URL = '...'` (linha ~476)
- Substituir com o novo URL

### 8. Testar
- Atualizar página da aplicação (F5)
- Ir a "Questões" > "⟲ Recarregar"
- **Deve funcionar agora!** ✅

---

## ✅ Checklist
- [ ] Código copiado e colado no AppScript
- [ ] Script guarda (Ctrl+S)
- [ ] Novo deployment criado ("Web app")
- [ ] URL copiado
- [ ] index.html atualizado com novo URL
- [ ] Página recarregada (F5)
- [ ] F12 > Console sem CORS error
- [ ] Questões carregadas ✨

---

## 🆘 Se não funcionar depois

Execute na consola do browser (F12):
```javascript
carregarQuestoesDoSheet()
```

Procure na consola por:
- ✅ Se vir: `"Questões carregadas do sheet: [...]"` = sucesso!
- ❌ Se vir CORS error = URL ainda desatualizado
- ❌ Se vir `"obterQuestoes"` error no AppScript = script não foi salvo

---

## 📝 Nota
O URL de deployment muda cada vez que faz "New deployment".  
Você **NÃO pode usar o URL antigo** depois de redeployar.


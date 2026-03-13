# Configuração do AppScript para Sync Automático

## 📋 Instruções de Setup

### Passo 1: Aceder ao Google Apps Script

1. Abra o seu Google Sheet
2. Menu superior: **Extensões** > **Apps Script**
3. Uma aba nova abrirá com o editor de apps script

### Passo 2: Limpar e Colar o Código

1. **Selecione todo** o código no editor (Ctrl+A)
2. **Apague-o**
3. Abra o ficheiro `appscript.gs` nesta pasta
4. **Copie TODO o código**
5. **Cole** no editor do Google Apps Script
6. Clique **Guardar** (Ctrl+S)

### Passo 3: Deploy do Script

1. Clique em **Deploy** (botão azul, canto superior)
2. Selecione **New Deployment** (+ icon)
3. No menu de tipo, selecione **Web app**
4. Preencha:
   - **Execute as:** [Sua conta de email]
   - **Who has access:** Anyone
5. Clique **Deploy**
6. Autorize a aplicação (siga os passos)
7. **Copie o URL de deployment** - será algo como:
   ```
   https://script.google.com/macros/d/[ID-LONGO]/usercopy
   ```

### Passo 4: Adicionar URL ao Sistema

1. Abra `index.html`
2. Procure por esta linha (próximo ao topo do código JavaScript):
   ```javascript
   const APPSCRIPT_URL = '';
   ```
3. Cole o URL completo:
   ```javascript
   const APPSCRIPT_URL = 'https://script.google.com/macros/d/[SEU-ID]/usercopy';
   ```
4. Guarde o ficheiro

### Passo 5: Testar

1. Recarregue o sistema
2. Vá ao módulo "Planeamento (INTRO)"
3. Preencha um planeamento e clique "Guardar Planeamento"
4. Verifique o Google Sheet se aparece novo registo em INTRO
5. Vá ao módulo "Execução (AUDITORIA)"
6. Complete uma auditoria e clique "Guardar Auditoria"
7. Verifique o Google Sheet se aparece novo registo em AUDITORIA

## 🔄 O que é Sincronizado

| Ação | Folha | Campos |
|---|---|---|
| Guardar Planeamento | INTRO | ID, Departamento, Auditor Coordenador, Auditor, Auditado, Documentos Ref, Registado Por, Colaboradores, Requisitos, Data, Hora Prevista |
| Guardar Auditoria | AUDITORIA | ID, Departamento, Investigação, Foco, Constatação, OM, NC |
| Adicionar Questão | REGISTOS | Departamento, Investigação, Foco/Requisito |

## ⚠️ Troubleshooting

### "URL não reconhecido"
- Certifique-se que coprou o URL completo e SEM espaços em branco
- O URL deve começar com `https://script.google.com/macros/d/`

### "Erro ao conectar"
- Verifique a conexão de internet
- Tente fazer deploy novamente
- Verifique as permissões no Apps Script (deve ser "Anyone")

### "Dados não aparecem no Sheet"
- Verifique se tem permissão de edição no Google Sheet
- Abra o console do navegador (F12) e verifique se há erros
- Tente recarregar a página

### "Folha AUDITORIA não existe"
- Abra o Google Sheet
- Clique em "+" para adicionar uma folha nova
- Nomeie-a exatamente como: `AUDITORIA`
- O AppScript criará os headers automaticamente

## 📝 Notas de Segurança

- O AppScript tem acesso completo à folha
- Os dados são enviados via HTTPS
- Qualquer pessoa com o URL pode enviar dados se for publicado
- Para maior segurança, mude a permissão para "Only me" específicas de utilizadores


# Guia de Setup - Google Sheets Integration

## Pré-requisitos

1. Node.js 16+ instalado
2. Google Cloud Project com Sheets API ativada
3. Service Account com credenciais JSON

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Obter credenciais do Google

1. Aceda a [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative a "Google Sheets API"
4. Crie uma "Service Account":
   - Vá para "Service Accounts"
   - Clique em "Create Service Account"
   - Preencha os dados básicos
   - Na aba "Keys", clique em "Add Key" > "Create new key"
   - Selecione formato "JSON"
   - Guarde o arquivo JSON

### 3. Configurar credenciais

```bash
# Copie o arquivo JSON para a pasta do projeto
cp ~/Downloads/seu-arquivo-service-account.json ./service-account.json

# Ou configure via variável de ambiente
export GOOGLE_SERVICE_ACCOUNT=./service-account.json
```

### 4. Partilhar o Google Sheet com a Service Account

1. Abra o seu Google Sheet
2. Clique em "Partilhar"
3. Copie o email da service account (do arquivo JSON: `client_email`)
4. Cole e dê acesso de "Editor"

### 5. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite .env e coloque o ID do seu Google Sheet
```

### 6. Iniciar o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor rodará em `http://localhost:3002`

## Endpoints disponíveis

### POST `/salvarIntro`
Grava auditoria planificada na folha "INTRO"

```json
{
  "id": "AUD-20260313-001",
  "departamento": "DCO",
  "auditorCoord": "João Silva",
  "auditor": "Maria Santos",
  "auditado": "Carlos Pereira",
  "documentosRef": "ISO 9001; Procedimento",
  "registadoPor": "Admin",
  "colaboradores": "Teste",
  "requisitos": "ISO 9001",
  "dataAuditoria": "2026-03-13",
  "horaPrevista": "10:00",
  "horaAuditoria": "10:00"
}
```

### POST `/salvarAuditoria`
Grava registos de auditoria na folha "AUDITORIA"

### POST `/adicionarQuestao`
Adiciona questão na folha "REGISTOS"

## Troubleshooting

### "Erro: ENOENT: no such file or directory"
- Verifique se `service-account.json` existe
- Ou configure a variável `GOOGLE_SERVICE_ACCOUNT`

### "Erro: 404 Spreadsheet not found"
- Verifique o ID do Google Sheet em `.env`
- Confirme que a service account tem acesso

### "Erro: 403 Forbidden"
- Confirme que partilhou o Sheet com o email da service account
- Verifique as permissões de "Editor"

## Atualizar o HTML

Mude a URL no HTML:

```javascript
// De:
const APPSCRIPT_URL = 'https://script.google.com/macros/s/...';

// Para:
const APPSCRIPT_URL = 'http://localhost:3002'; // Desenvolvimento
// ou
const APPSCRIPT_URL = 'https://seu-dominio.com'; // Produção
```

E atualize o JavaScript para usar os novos endpoints:
- `/salvarIntro` em vez de `salvarIntro`
- `/salvarAuditoria` em vez de `salvarAuditoria`
- `/adicionarQuestao` em vez de `adicionarQuestao`

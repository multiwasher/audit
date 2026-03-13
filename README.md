# Sistema de Auditorias - Guia de Utilização

## 📋 Visão Geral

Aplicação web para gestão flexível de auditorias, registo de evidências e geração de relatórios. Totalmente funcional com armazenamento local (localStorage) ou integração com Google Sheets.

---

## 🎯 Módulos

### 1. **Planeamento (INTRO)**
Cronograma de auditorias e preparação
- Registe ID, departamento, auditores (coordenador e auditor)
- Informações sobre auditado, documentos de referência
- Colaboradores contactados e requisitos
- Data e hora prevista/real da auditoria
- **Ações**: Guardar, editar, visualizar e remover planeamentos

### 2. **Execução (AUDITORIA)**
Realização das auditorias com registo de evidências
- Selecione o departamento
- Aceda automaticamente às questões específicas
- Para cada questão, registe:
  - **Constatação/Evidência**: o que foi encontrado
  - **OM (Observação de Melhoria)**: recomendações
  - **NC (Não-Conformidade)**: Nenhuma/Menor/Maior
- Guarde a auditoria completa

### 3. **Questões**
Gestão de questões por departamento
- Adicione novas questões específicas de auditoria
- Associe a cada departamento
- Defina foco/requisito para cada questão
- **Dados de exemplo fornecidos**: Financeiro e RH
- Remova questões conforme necessário

### 4. **Relatório**
Visualize e exporte auditorias realizadas
- Selecione uma auditoria para ver relatório completo
- Conteúdo: planeamento, constatações, resumo de não-conformidades
- **Exporte para PDF**: use Ctrl+P e "Guardar como PDF"
- **Imprima**: função de impressão integrada

---

## 🚀 Como Utilizador

### Primeiro Uso
1. Abra `index.html` num navegador
2. Aceda ao módulo **Questões**
3. Adicione questões específicas para seus departamentos
4. Configure pelo menos uma questão para começar

### Fluxo de Auditoria Típico

**Fase 1 - Planeamento:**
1. Módulo "Planeamento (INTRO)"
2. Preencha todos os campos obrigatórios
3. Clique "Guardar Planeamento"

**Fase 2 - Execução:**
1. Módulo "Execução (AUDITORIA)"
2. Selecione o departamento
3. Para cada questão, registe as evidências encontradas
4. Classifique as não-conformidades (Nenhuma/Menor/Maior)
5. Clique "Guardar Auditoria"

**Fase 3 - Relatório:**
1. Módulo "Relatório"
2. Selecione a auditoria realizada
3. Revise as constatações
4. Exporte em PDF ou imprima

---

## 💾 Armazenamento de Dados

### Local (Default)
- Os dados são guardados em `localStorage` do navegador
- **Vantagem**: Rápido, sem dependências
- **Desvantagem**: Dados locais apenas desta máquina

### Integração com Google Sheets (Opcional)

Para sincronizar com seu ficheiro Google Sheets, você precisará:

1. **Configurar acesso à API do Google Sheets** via Google Cloud Console
2. **Autenticar a aplicação** com sua conta Google
3. **Mapear os dados** entre a app e as sheets

**Estrutura esperada nas Sheets:**

**Sheet "INTRO":**
```
ID | DEPARTAMENTO | AUDITOR Coordenador | AUDITOR | AUDITADO | DOCUMENTOS DE REFERÊNCIA DA EMPRESA | REGISTADO POR | COLABORADORES CONTACTADOS | REQUISITOS | HORA PREVISTA | HORA DA AUDITORIA | DATA DE AUDITORIA
```

**Sheet "AUDITORIA":**
```
ID | DEPARTAMENTO | Investigação (Questão de Auditoria) | Foco / Requisito | CONSTATAÇÃO / EVIDÊNCIA | OM | NC
```

---

## 🎨 Personalizações Possíveis

### Interface
- Altere as cores no CSS (ex: `#667eea` para outra cor)
- Adicione logo da empresa no header
- Customize campos conforme necessário

### Campos
- Adicione/remova campos conforme suas necessidades
- Modifique labels para português PT/BR

### Questões
- As questões são 100% customizáveis
- Adicione perguntas específicas do seu contexto
- Reorganize por departamento conforme estrutura

---

## 📊 Estrutura de Dados

```javascript
{
  introPlaneamentos: [
    {
      id: "AUD-001",
      departamento: "Financeiro",
      auditorCoord: "João Silva",
      // ... mais campos
    }
  ],
  questoes: [
    {
      id: "Q1",
      departamento: "Financeiro",
      questao: "...",
      foco: "..."
    }
  ],
  auditorias: [
    {
      id: "AUD-001",
      departamento: "Financeiro",
      respostas: {
        Q1: {
          evidencia: "...",
          om: "...",
          nc: "Nenhuma"
        }
      }
    }
  ]
}
```

---

## 🔧 Funcionalidades Técnicas

- ✅ **Responsivo**: Funciona em desktop, tablet, mobile
- ✅ **Sem dependências**: PHP/Python/Node.js - apenas HTML, CSS, JS
- ✅ **Persistente**: Dados guardados localmente
- ✅ **Modo offline**: Funciona sem internet
- ✅ **Exportação**: PDF via impressão nativa do navegador

---

## 📝 Notas

- Use IDs únicos para auditorias (ex: AUD-001, AUD-002, etc.)
- As datas devem seguir formato YYYY-MM-DD
- As não-conformidades podem ser categorizadas em 3 níveis
- O relatório agrupa informações automaticamente

---

## 📧 Suporte

Para perguntas sobre funcionalidade ou modificações:
- Consulte o código JavaScript comentado em `index.html`
- Personalize conforme necessário

**Desenvolvido com ❤️ para máxima flexibilidade**
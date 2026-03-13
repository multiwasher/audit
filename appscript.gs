// Google Apps Script - Cole este código no Editor de Apps Script do Google Sheet
// 1. Abra o Google Sheet
// 2. Menu: Extensões > Apps Script
// 3. Limpe o código predefinido
// 4. Cole todo este código
// 5. Clique em "Deploy" > "New Deployment"
// 6. Selecione "Web app"
// 7. Execute como: [sua conta]
// 8. Quem tem acesso: Qualquer um
// 9. Copie o URL de deployment
// 10. Cole o URL no HTML em APPSCRIPT_URL

function doPost(e) {
  try {
    let data;
    
    // Lidar com JSON ou form data
    if (e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter.data) {
      // Dados vindos de um formulário
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('Dados inválidos');
    }
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const operacao = data.operacao;
    
    if (operacao === 'salvarIntro') {
      adicionarAuditoriaPlanificada(spreadsheet, data);
    } else if (operacao === 'salvarAuditoria') {
      adicionarRegistosAuditoria(spreadsheet, data);
    } else if (operacao === 'adicionarQuestao') {
      adicionarQuestao(spreadsheet, data);
    } else if (operacao === 'apagarIntro') {
      apagarAuditoriaPlanificada(spreadsheet, data);
    }
    
    // Retornar resposta silenciosa (sem abrir janela)
    return HtmlService.createHtmlOutput('<script>window.close();</script>').setWidth(1).setHeight(1);
    
  } catch (erro) {
    return HtmlService.createHtmlOutput('<script>window.close();</script>').setWidth(1).setHeight(1);
  }
}

// Adicionar auditoria planeada à folha INTRO
function adicionarAuditoriaPlanificada(spreadsheet, data) {
  try {
    const sheet = spreadsheet.getSheetByName('INTRO');
    
    // Headers esperados
    const headers = [
      'ID', 'Departamento', 'Auditor Coordenador', 'Auditor', 'Auditado',
      'Documentos de Referência da Empresa', 'Registado Por', 'Colaboradores Contactados',
      'Requisitos', 'Data de Auditoria', 'Hora Prevista', 'Hora da Auditoria'
    ];
    
    // Verificar se headers existem, se não, adicionar
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      for (let i = 0; i < headers.length; i++) {
        sheet.getRange(1, i + 1).setValue(headers[i]);
      }
    }
    
    // Adicionar nova linha de dados
    const novaLinha = sheet.getLastRow() + 1;
    
    const valores = [
      data.id,
      data.departamento,
      data.auditorCoord,
      data.auditor,
      data.auditado,
      data.documentosRef,
      data.registadoPor,
      data.colaboradores,
      data.requisitos,
      data.dataAuditoria,
      data.horaPrevista,
      data.horaAuditoria
    ];
    
    for (let i = 0; i < valores.length; i++) {
      sheet.getRange(novaLinha, i + 1).setValue(valores[i]);
    }
  } catch (erro) {
    Logger.log('Erro em adicionarAuditoriaPlanificada: ' + erro);
    throw erro;
  }
}

// Adicionar registos de auditoria à folha AUDITORIA
function adicionarRegistosAuditoria(spreadsheet, data) {
  try {
    const sheet = spreadsheet.getSheetByName('AUDITORIA');
    
    // Headers esperados conforme especificado
    const headers = [
      'ID', 'DEPARTAMENTO', 'Investigação (Questão de Auditoria)',
      'Foco / Requisito', 'CONSTATAÇÃO / EVIDÊNCIA', 'OM', 'NC'
    ];
    
    // Verificar se headers existem
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      for (let i = 0; i < headers.length; i++) {
        sheet.getRange(1, i + 1).setValue(headers[i]);
      }
    }
    
    // Adicionar uma linha por cada questão respondida
    if (data.registos && Array.isArray(data.registos)) {
      data.registos.forEach((registo) => {
        const novaLinha = sheet.getLastRow() + 1;
        
        const valores = [
          registo.id,
          registo.departamento,
          registo.investigacao,
          registo.foco,
          registo.evidencia,
          registo.om,
          registo.nc
        ];
        
        for (let i = 0; i < valores.length; i++) {
          sheet.getRange(novaLinha, i + 1).setValue(valores[i]);
        }
      });
    }
  } catch (erro) {
    Logger.log('Erro em adicionarRegistosAuditoria: ' + erro);
    throw erro;
  }
}

// Adicionar questão à folha REGISTOS
function adicionarQuestao(spreadsheet, data) {
  try {
    const sheet = spreadsheet.getSheetByName('REGISTOS');
    
    // Headers esperados
    const headers = [
      'Departamento', 'Investigação (Questão de Auditoria)', 'Foco / Requisito'
    ];
    
    // Verificar se headers existem
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      for (let i = 0; i < headers.length; i++) {
        sheet.getRange(1, i + 1).setValue(headers[i]);
      }
    }
    
    // Adicionar nova questão
    const novaLinha = sheet.getLastRow() + 1;
    
    const valores = [
      data.departamento,
      data.investigacao,
      data.foco
    ];
    
    for (let i = 0; i < valores.length; i++) {
      sheet.getRange(novaLinha, i + 1).setValue(valores[i]);
    }
  } catch (erro) {
    Logger.log('Erro em adicionarQuestao: ' + erro);
    throw erro;
  }
}

// Apagar auditoria planificada da folha INTRO
function apagarAuditoriaPlanificada(spreadsheet, data) {
  try {
    const sheet = spreadsheet.getSheetByName('INTRO');
    const auditId = data.id;
    
    // Procurar a linha com o ID
    const lastRow = sheet.getLastRow();
    for (let i = 2; i <= lastRow; i++) { // Começar em 2 para pular o header
      const cellValue = sheet.getRange(i, 1).getValue(); // Coluna A tem o ID
      if (cellValue === auditId) {
        sheet.deleteRow(i);
        Logger.log('Linha apagada: ' + i);
        return;
      }
    }
    Logger.log('ID não encontrado: ' + auditId);
  } catch (erro) {
    Logger.log('Erro em apagarAuditoriaPlanificada: ' + erro);
    throw erro;
  }
}

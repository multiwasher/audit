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
// 10. Cale o URL no JavaScript: const APPSCRIPT_URL = 'seu-url-aqui';

function doPost(e) {
  try {
    let data = JSON.parse(e.postData.contents);
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Determinar qual folha e qual operação
    const operacao = data.operacao;
    
    if (operacao === 'salvarIntro') {
      adicionarAuditoriaPlanificada(spreadsheet, data);
    } else if (operacao === 'salvarAuditoria') {
      adicionarRegistosAuditoria(spreadsheet, data);
    } else if (operacao === 'adicionarQuestao') {
      adicionarQuestao(spreadsheet, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Dados gravados com sucesso'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (erro) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: erro.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Adicionar auditoria planeada à folha INTRO
function adicionarAuditoriaPlanificada(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName('INTRO');
  
  // Headers esperados
  const headers = [
    'ID', 'Departamento', 'Auditor Coordenador', 'Auditor', 'Auditado',
    'Documentos de Referência da Empresa', 'Registado Por', 'Colaboradores Contactados',
    'Requisitos', 'Data de Auditoria', 'Hora Prevista', 'Hora da Auditoria'
  ];
  
  // Verificar se headers existem, se não, adicionar
  const primeiraLinha = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (primeiraLinha[0] !== 'ID') {
    sheet.insertRows(1);
    for (let i = 0; i < headers.length; i++) {
      sheet.getRange(1, i + 1).setValue(headers[i]);
    }
  }
  
  // Adicionar nova linha de dados
  const ultimaLinha = sheet.getLastRow();
  const novaLinha = ultimaLinha + 1;
  
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
}

// Adicionar registos de auditoria à folha AUDITORIA
function adicionarRegistosAuditoria(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName('AUDITORIA');
  
  // Headers esperados conforme especificado
  const headers = [
    'ID', 'DEPARTAMENTO', 'Investigação (Questão de Auditoria)',
    'Foco / Requisito', 'CONSTATAÇÃO / EVIDÊNCIA', 'OM', 'NC'
  ];
  
  // Verificar se headers existem
  const primeiraLinha = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (primeiraLinha[0] !== 'ID') {
    sheet.insertRows(1);
    for (let i = 0; i < headers.length; i++) {
      sheet.getRange(1, i + 1).setValue(headers[i]);
    }
  }
  
  // Adicionar uma linha por cada questão respondida
  data.registos.forEach((registo) => {
    const ultimaLinha = sheet.getLastRow();
    const novaLinha = ultimaLinha + 1;
    
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

// Adicionar questão à folha REGISTOS
function adicionarQuestao(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName('REGISTOS');
  
  // Headers esperados
  const headers = [
    'Departamento', 'Investigação (Questão de Auditoria)', 'Foco / Requisito'
  ];
  
  // Verificar se headers existem
  const primeiraLinha = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (primeiraLinha[0] !== 'Departamento') {
    sheet.insertRows(1);
    for (let i = 0; i < headers.length; i++) {
      sheet.getRange(1, i + 1).setValue(headers[i]);
    }
  }
  
  // Adicionar nova questão
  const ultimaLinha = sheet.getLastRow();
  const novaLinha = ultimaLinha + 1;
  
  const valores = [
    data.departamento,
    data.investigacao,
    data.foco
  ];
  
  for (let i = 0; i < valores.length; i++) {
    sheet.getRange(novaLinha, i + 1).setValue(valores[i]);
  }
}

// Função auxiliar para testar o deployment
function testarDeployment() {
  const dados = {
    operacao: 'salvarIntro',
    id: 'TEST-001',
    departamento: 'DCO',
    auditorCoord: 'Teste',
    auditor: 'Teste',
    auditado: 'Teste',
    documentosRef: 'Teste',
    registadoPor: 'Teste',
    colaboradores: 'Teste',
    requisitos: 'Teste',
    dataAuditoria: '2026-03-13',
    horaPrevista: '10:00',
    horaAuditoria: '10:00'
  };
  
  Logger.log('Teste de deployment bem-sucedido');
  Logger.log(JSON.stringify(dados));
}

// ============================================================
// GOOGLE APPS SCRIPT — Backend para o Álbum Copa 2026
// Cole este código no Google Apps Script e publique como Web App
// ============================================================

const SHEET_NAMES = {
  COLLECTION: "colecao",
  LOG: "historico"
};

// ---- PONTO DE ENTRADA ----

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action || (e.parameter && e.parameter.action);

    let result;
    switch (action) {
      case "getCollection":  result = getCollection(); break;
      case "setSticker":     result = setSticker(body.stickerId, body.status, body.quantity); break;
      case "bulkUpdate":     result = bulkUpdate(body.updates); break;
      case "getStats":       result = getStats(); break;
      case "reset":          result = resetCollection(); break;
      default:               result = { error: "Ação desconhecida: " + action };
    }

    return respond(result);
  } catch (err) {
    return respond({ error: err.message });
  }
}

function doGet(e) {
  const action = e.parameter.action || "getCollection";
  let result;
  switch (action) {
    case "getCollection": result = getCollection(); break;
    case "getStats":      result = getStats(); break;
    default:              result = { error: "Ação desconhecida" };
  }
  return respond(result);
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- FUNÇÕES DE DADOS ----

function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === SHEET_NAMES.COLLECTION) {
      sheet.getRange("A1:C1").setValues([["id", "status", "quantity"]]);
      sheet.getRange("A1:C1").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    if (name === SHEET_NAMES.LOG) {
      sheet.getRange("A1:D1").setValues([["timestamp", "id", "status", "quantity"]]);
      sheet.getRange("A1:D1").setFontWeight("bold");
    }
  }
  return sheet;
}

function getCollection() {
  const sheet = getOrCreateSheet(SHEET_NAMES.COLLECTION);
  const data = sheet.getDataRange().getValues();
  const collection = {};

  // Pula cabeçalho (linha 0)
  for (let i = 1; i < data.length; i++) {
    const [id, status, quantity] = data[i];
    if (id && status) {
      collection[id] = { status, quantity: parseInt(quantity) || 1 };
    }
  }

  return { collection };
}

function setSticker(stickerId, status, quantity) {
  if (!stickerId) return { error: "stickerId obrigatório" };

  const sheet = getOrCreateSheet(SHEET_NAMES.COLLECTION);
  const data = sheet.getDataRange().getValues();

  // Procura linha existente
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === stickerId) { rowIndex = i + 1; break; }
  }

  if (status === "missing") {
    // Remove a linha se existir
    if (rowIndex > 0) sheet.deleteRow(rowIndex);
  } else {
    if (rowIndex > 0) {
      // Atualiza
      sheet.getRange(rowIndex, 2, 1, 2).setValues([[status, quantity]]);
    } else {
      // Insere nova linha
      const lastRow = Math.max(sheet.getLastRow(), 1);
      sheet.getRange(lastRow + 1, 1, 1, 3).setValues([[stickerId, status, quantity]]);
    }
  }

  // Log
  addLog(stickerId, status, quantity);

  return { success: true, stickerId, status, quantity };
}

function bulkUpdate(updates) {
  if (!Array.isArray(updates) || updates.length === 0) {
    return { error: "updates deve ser array não vazio" };
  }

  const sheet = getOrCreateSheet(SHEET_NAMES.COLLECTION);
  const data = sheet.getDataRange().getValues();

  // Mapa id → rowIndex (1-based)
  const rowMap = {};
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) rowMap[data[i][0]] = i + 1;
  }

  const toAdd = [];
  const toDelete = [];

  updates.forEach(({ id, status, quantity = 1 }) => {
    if (!id) return;

    if (status === "missing") {
      if (rowMap[id]) toDelete.push(rowMap[id]);
    } else {
      if (rowMap[id]) {
        sheet.getRange(rowMap[id], 2, 1, 2).setValues([[status, quantity]]);
      } else {
        toAdd.push([id, status, quantity]);
      }
    }
  });

  // Deleta de baixo pra cima para não deslocar índices
  toDelete.sort((a, b) => b - a).forEach(r => sheet.deleteRow(r));

  // Adiciona em batch
  if (toAdd.length > 0) {
    const lastRow = Math.max(sheet.getLastRow(), 1);
    sheet.getRange(lastRow + 1, 1, toAdd.length, 3).setValues(toAdd);
  }

  return { success: true, updated: updates.length };
}

function getStats() {
  const { collection } = getCollection();
  let owned = 0, duplicates = 0, missing = 0;

  Object.values(collection).forEach(({ status, quantity }) => {
    if (status === "owned") {
      owned++;
      if (quantity > 1) duplicates += quantity - 1;
    } else if (status === "duplicate") {
      owned++;
      duplicates += quantity || 1;
    }
  });

  return { owned, duplicates, missing, source: "sheets" };
}

function resetCollection() {
  const sheet = getOrCreateSheet(SHEET_NAMES.COLLECTION);
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  return { success: true };
}

function addLog(id, status, quantity) {
  try {
    const log = getOrCreateSheet(SHEET_NAMES.LOG);
    const ts = new Date().toISOString();
    log.appendRow([ts, id, status, quantity]);
  } catch (e) {
    // Log não é crítico, ignora erros
  }
}

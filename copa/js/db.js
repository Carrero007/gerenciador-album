// ============================================================
// CONFIGURAÇÃO DO GOOGLE SHEETS
// Edite as variáveis abaixo com seus dados
// ============================================================

const CONFIG = {
  // Cole aqui o ID da sua planilha (está na URL do Google Sheets)
  // Exemplo: https://docs.google.com/spreadsheets/d/ESTE_AQUI_É_O_ID/edit
  SHEET_ID: "SEU_SHEET_ID_AQUI",

  // Nome das abas da planilha (não altere se usar o template)
  SHEETS: {
    COLLECTION: "colecao",   // Aba com suas figurinhas
    DUPLICATES: "repetidas", // Aba com repetidas
    WISHLIST: "faltando"     // Aba com faltando
  },

  // URL base da API pública (Apps Script Web App)
  // Você vai preencher depois de publicar o Apps Script
  APPS_SCRIPT_URL: "SUA_URL_DO_APPS_SCRIPT_AQUI"
};

// ============================================================
// CAMADA DE DADOS - Google Sheets via Apps Script
// ============================================================

const SheetsDB = {
  async request(action, payload = {}) {
    try {
      const url = new URL(CONFIG.APPS_SCRIPT_URL);
      url.searchParams.set("action", action);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors"
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (err) {
      console.error("[SheetsDB] Erro:", err);
      throw err;
    }
  },

  async getCollection() {
    return this.request("getCollection");
  },

  async setSticker(stickerId, status, quantity = 1) {
    return this.request("setSticker", { stickerId, status, quantity });
  },

  async bulkUpdate(updates) {
    return this.request("bulkUpdate", { updates });
  },

  async getStats() {
    return this.request("getStats");
  },

  async reset() {
    return this.request("reset");
  }
};

// ============================================================
// FALLBACK LOCAL (LocalStorage) - usado quando Apps Script
// não está configurado ou há erro de conexão
// ============================================================

const LocalDB = {
  KEY: "album_copa_2026",

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },

  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  get(stickerId) {
    const db = this.load();
    return db[stickerId] || { status: "missing", quantity: 0 };
  },

  set(stickerId, status, quantity = 1) {
    const db = this.load();
    if (status === "missing") {
      delete db[stickerId];
    } else {
      db[stickerId] = { status, quantity };
    }
    this.save(db);
    return db[stickerId] || { status: "missing", quantity: 0 };
  },

  getAll() {
    return this.load();
  },

  reset() {
    localStorage.removeItem(this.KEY);
  },

  exportJSON() {
    return JSON.stringify(this.load(), null, 2);
  }
};

// ============================================================
// INTERFACE UNIFICADA DE DADOS
// Tenta Google Sheets primeiro, cai para LocalStorage
// ============================================================

const DB = {
  useSheets: false,
  _cache: null,
  _dirty: false,

  async init() {
    // Verifica se Apps Script está configurado
    if (CONFIG.APPS_SCRIPT_URL && CONFIG.APPS_SCRIPT_URL !== "SUA_URL_DO_APPS_SCRIPT_AQUI") {
      try {
        const data = await SheetsDB.getCollection();
        this._cache = data.collection || {};
        this.useSheets = true;
        console.log("[DB] Usando Google Sheets ✅");
        return { source: "sheets" };
      } catch (e) {
        console.warn("[DB] Google Sheets indisponível, usando LocalStorage:", e.message);
      }
    }
    // Fallback local
    this._cache = LocalDB.getAll();
    this.useSheets = false;
    console.log("[DB] Usando LocalStorage 💾");
    return { source: "local" };
  },

  getAll() {
    return this._cache || LocalDB.getAll();
  },

  get(stickerId) {
    const all = this.getAll();
    return all[stickerId] || { status: "missing", quantity: 0 };
  },

  async set(stickerId, status, quantity = 1) {
    // Atualiza cache imediatamente (otimista)
    if (!this._cache) this._cache = {};
    if (status === "missing") {
      delete this._cache[stickerId];
    } else {
      this._cache[stickerId] = { status, quantity };
    }

    // Persiste
    if (this.useSheets) {
      try {
        await SheetsDB.setSticker(stickerId, status, quantity);
      } catch (e) {
        console.warn("[DB] Falha ao salvar no Sheets, salvando local:", e.message);
        LocalDB.set(stickerId, status, quantity);
      }
    } else {
      LocalDB.set(stickerId, status, quantity);
    }
  },

  async bulkSet(updates) {
    if (!this._cache) this._cache = {};
    updates.forEach(({ id, status, quantity = 1 }) => {
      if (status === "missing") delete this._cache[id];
      else this._cache[id] = { status, quantity };
    });

    if (this.useSheets) {
      try {
        await SheetsDB.bulkUpdate(updates);
        return;
      } catch (e) {
        console.warn("[DB] Bulk update falhou no Sheets:", e.message);
      }
    }
    // Local
    const db = LocalDB.load();
    updates.forEach(({ id, status, quantity = 1 }) => {
      if (status === "missing") delete db[id];
      else db[id] = { status, quantity };
    });
    LocalDB.save(db);
  },

  computeStats() {
    const all = this.getAll();
    let owned = 0, duplicates = 0, missing = 0, total = 0;

    ALBUM_DATA.forEach(section => {
      section.stickers.forEach(s => {
        total++;
        const entry = all[s.id];
        if (!entry || entry.status === "missing") {
          missing++;
        } else if (entry.status === "owned") {
          owned++;
          if (entry.quantity > 1) duplicates += entry.quantity - 1;
        } else if (entry.status === "duplicate") {
          owned++;
          duplicates += entry.quantity || 1;
        }
      });
    });

    return { owned, duplicates, missing, total, percent: Math.round((owned / total) * 100) };
  },

  exportJSON() {
    return JSON.stringify(this.getAll(), null, 2);
  },

  importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (typeof data !== "object") throw new Error("Formato inválido");
      this._cache = data;
      LocalDB.save(data);
      return true;
    } catch {
      return false;
    }
  },

  async reset() {
    this._cache = {};
    if (this.useSheets) {
      try { await SheetsDB.reset(); } catch {}
    }
    LocalDB.reset();
  }
};

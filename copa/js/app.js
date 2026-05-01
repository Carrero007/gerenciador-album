// ============================================================
// APP PRINCIPAL - Gerenciador de Figurinhas Copa 2026
// ============================================================

const App = {
  currentSection: null,
  currentFilter: "all",
  searchQuery: "",
  view: "grid",
  toast: null,

  // ---- INICIALIZAÇÃO ----
  async init() {
    this.showLoader(true);
    try {
      const { source } = await DB.init();
      this.renderSidebar();
      this.renderStats();
      this.showSection(ALBUM_DATA[0].id);
      this.bindGlobalEvents();
      this.updateStatusBar(source);
    } catch (e) {
      console.error(e);
    }
    this.showLoader(false);
  },

  showLoader(on) {
    document.getElementById("loader").style.display = on ? "flex" : "none";
  },

  updateStatusBar(source) {
    const el = document.getElementById("db-source");
    if (el) {
      el.textContent = source === "sheets" ? "☁️ Google Sheets" : "💾 Local";
      el.className = source === "sheets" ? "badge-sheets" : "badge-local";
    }
  },

  // ---- SIDEBAR ----
  renderSidebar() {
    const container = document.getElementById("sidebar-sections");
    container.innerHTML = "";

    ALBUM_DATA.forEach(section => {
      const all = section.stickers;
      const owned = all.filter(s => {
        const e = DB.get(s.id);
        return e.status === "owned" || e.status === "duplicate";
      }).length;
      const pct = Math.round((owned / all.length) * 100);

      const item = document.createElement("div");
      item.className = "sidebar-item";
      item.dataset.id = section.id;
      item.innerHTML = `
        <span class="sidebar-icon">${section.icon}</span>
        <div class="sidebar-info">
          <span class="sidebar-name">${section.name}</span>
          <div class="sidebar-progress">
            <div class="sidebar-bar" style="width:${pct}%; background:${section.color}"></div>
          </div>
        </div>
        <span class="sidebar-count">${owned}/${all.length}</span>
      `;
      item.addEventListener("click", () => this.showSection(section.id));
      container.appendChild(item);
    });
  },

  // ---- SEÇÃO PRINCIPAL ----
  showSection(sectionId) {
    this.currentSection = sectionId;
    this.searchQuery = "";
    document.getElementById("search-input").value = "";

    // Destaca item ativo
    document.querySelectorAll(".sidebar-item").forEach(el => {
      el.classList.toggle("active", el.dataset.id === sectionId);
    });

    const section = ALBUM_DATA.find(s => s.id === sectionId);
    if (!section) return;

    document.getElementById("section-title").textContent = `${section.icon} ${section.name}`;
    document.getElementById("section-subtitle").textContent = `${section.stickers.length} figurinhas`;

    this.renderStickers(section);
    this.renderStats();

    // Mobile: fecha sidebar
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.remove("open");
    }
  },

  renderStickers(section) {
    const grid = document.getElementById("stickers-grid");
    grid.innerHTML = "";
    grid.className = `stickers-grid view-${this.view}`;

    const filtered = this.getFilteredStickers(section.stickers);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state">
        <span class="empty-icon">🔍</span>
        <p>Nenhuma figurinha encontrada</p>
      </div>`;
      return;
    }

    filtered.forEach(sticker => {
      const entry = DB.get(sticker.id);
      const card = this.createStickerCard(sticker, entry, section);
      grid.appendChild(card);
    });

    // Atualiza contador de filtro
    const total = section.stickers.length;
    document.getElementById("filter-count").textContent =
      `${filtered.length} de ${total} figurinhas`;
  },

  getFilteredStickers(stickers) {
    return stickers.filter(s => {
      const entry = DB.get(s.id);
      const q = this.searchQuery.toLowerCase();

      const matchesSearch = !q ||
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.number.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      switch (this.currentFilter) {
        case "owned":    return entry.status === "owned";
        case "missing":  return !entry.status || entry.status === "missing";
        case "duplicate":return entry.status === "duplicate" || (entry.status === "owned" && entry.quantity > 1);
        default:         return true;
      }
    });
  },

  createStickerCard(sticker, entry, section) {
    const card = document.createElement("div");
    const status = entry.status || "missing";
    card.className = `sticker-card status-${status} ${sticker.special ? "special" : ""}`;
    card.dataset.id = sticker.id;

    const qty = entry.quantity || 0;
    const dupCount = status === "owned" && qty > 1 ? qty - 1 :
                     status === "duplicate" ? qty : 0;

    card.innerHTML = `
      <div class="sticker-inner">
        <div class="sticker-header" style="background:${section.color}20; border-color:${section.color}40">
          ${sticker.special ? '<span class="special-badge">⭐</span>' : ""}
          <span class="sticker-number">${sticker.number}</span>
        </div>
        <div class="sticker-body">
          <span class="sticker-name">${sticker.name}</span>
          <div class="sticker-status-icon">
            ${status === "owned"     ? "✅" :
              status === "duplicate" ? "🔄" : "❌"}
          </div>
          ${dupCount > 0 ? `<span class="dup-badge">+${dupCount} repetida${dupCount > 1 ? "s" : ""}</span>` : ""}
        </div>
        <div class="sticker-actions">
          <button class="btn-action btn-have" title="Tenho" onclick="App.setStatus('${sticker.id}', 'owned', 1)">✅</button>
          <button class="btn-action btn-dup"  title="Repetida" onclick="App.openDupModal('${sticker.id}')">🔄</button>
          <button class="btn-action btn-miss" title="Faltando" onclick="App.setStatus('${sticker.id}', 'missing', 0)">❌</button>
        </div>
      </div>
    `;

    // Click no card abre detalhes
    card.querySelector(".sticker-inner").addEventListener("click", (e) => {
      if (e.target.closest(".sticker-actions")) return;
      this.openStickerModal(sticker, entry, section);
    });

    return card;
  },

  // ---- AÇÕES DE FIGURINHA ----
  async setStatus(stickerId, status, quantity) {
    await DB.set(stickerId, status, quantity);
    this.refreshCurrentSection();
    this.renderSidebar();
    this.renderStats();
    this.showToast(
      status === "owned"     ? "✅ Figurinha marcada!" :
      status === "duplicate" ? `🔄 Repetida registrada (${quantity}x)!` :
                               "❌ Marcada como faltando"
    );
  },

  openDupModal(stickerId) {
    const modal = document.getElementById("dup-modal");
    document.getElementById("dup-sticker-id").textContent = stickerId;
    document.getElementById("dup-qty").value = 2;
    modal.dataset.stickerId = stickerId;
    modal.classList.add("open");
  },

  openStickerModal(sticker, entry, section) {
    const modal = document.getElementById("sticker-modal");
    const qty = entry.quantity || 0;
    const status = entry.status || "missing";

    modal.querySelector(".modal-sticker-num").textContent = sticker.number;
    modal.querySelector(".modal-sticker-name").textContent = sticker.name;
    modal.querySelector(".modal-sticker-section").textContent = section.name;
    modal.querySelector(".modal-sticker-status").textContent =
      status === "owned"     ? "✅ Tenho" :
      status === "duplicate" ? `🔄 Repetida (${qty}x)` : "❌ Faltando";
    modal.querySelector(".modal-sticker-header").style.background =
      `linear-gradient(135deg, ${section.color}, ${section.color}aa)`;

    modal.dataset.stickerId = sticker.id;
    modal.classList.add("open");
  },

  refreshCurrentSection() {
    if (!this.currentSection) return;
    const section = ALBUM_DATA.find(s => s.id === this.currentSection);
    if (section) this.renderStickers(section);
  },

  // ---- ESTATÍSTICAS ----
  renderStats() {
    const stats = DB.computeStats();
    document.getElementById("stat-owned").textContent    = stats.owned;
    document.getElementById("stat-missing").textContent  = stats.missing;
    document.getElementById("stat-dup").textContent      = stats.duplicates;
    document.getElementById("stat-total").textContent    = stats.total;
    document.getElementById("stat-pct").textContent      = `${stats.percent}%`;

    const ring = document.getElementById("progress-ring-fill");
    if (ring) {
      const circumference = 2 * Math.PI * 54;
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = circumference * (1 - stats.percent / 100);
    }

    // Barra de progresso global
    const bar = document.getElementById("global-progress-bar");
    if (bar) bar.style.width = `${stats.percent}%`;
  },

  // ---- PESQUISA E FILTROS ----
  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === filter);
    });
    this.refreshCurrentSection();
  },

  setSearch(q) {
    this.searchQuery = q;
    this.refreshCurrentSection();
  },

  setView(v) {
    this.view = v;
    document.querySelectorAll(".view-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.view === v);
    });
    this.refreshCurrentSection();
  },

  // ---- EXPORTAR LISTAS ----
  exportMissing() {
    const missing = [];
    ALBUM_DATA.forEach(section => {
      section.stickers.forEach(s => {
        const e = DB.get(s.id);
        if (!e.status || e.status === "missing") {
          missing.push(`${s.number} - ${s.name} (${section.name})`);
        }
      });
    });
    this.downloadText(missing.join("\n"), "figurinhas_faltando.txt");
    this.showToast("📄 Lista exportada!");
  },

  exportDuplicates() {
    const dups = [];
    ALBUM_DATA.forEach(section => {
      section.stickers.forEach(s => {
        const e = DB.get(s.id);
        const isDup = e.status === "duplicate" ||
                     (e.status === "owned" && e.quantity > 1);
        if (isDup) {
          const qty = e.status === "owned" ? e.quantity - 1 : e.quantity;
          dups.push(`${s.number} - ${s.name} (${section.name}) x${qty}`);
        }
      });
    });
    this.downloadText(dups.join("\n"), "figurinhas_repetidas.txt");
    this.showToast("📄 Repetidas exportadas!");
  },

  exportJSON() {
    this.downloadText(DB.exportJSON(), "colecao_copa2026.json");
    this.showToast("💾 Backup exportado!");
  },

  importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ok = DB.importJSON(e.target.result);
      if (ok) {
        this.refreshCurrentSection();
        this.renderSidebar();
        this.renderStats();
        this.showToast("✅ Coleção importada com sucesso!");
      } else {
        this.showToast("❌ Arquivo inválido!", "error");
      }
    };
    reader.readAsText(file);
  },

  downloadText(content, filename) {
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
    a.download = filename;
    a.click();
  },

  // ---- MODO DE ENTRADA EM MASSA ----
  openBulkModal() {
    document.getElementById("bulk-modal").classList.add("open");
    document.getElementById("bulk-input").value = "";
    document.getElementById("bulk-preview").innerHTML = "";
  },

  parseBulk() {
    const raw = document.getElementById("bulk-input").value;
    const lines = raw.split(/[\n,;]+/).map(s => s.trim().toUpperCase()).filter(Boolean);
    const preview = document.getElementById("bulk-preview");
    preview.innerHTML = "";
    let found = 0;

    lines.forEach(code => {
      // Tenta encontrar a figurinha
      let sticker = null;
      ALBUM_DATA.forEach(section => {
        const s = section.stickers.find(s => s.id.toUpperCase() === code || s.number.toUpperCase() === code);
        if (s) sticker = { ...s, section: section.name };
      });

      const el = document.createElement("div");
      el.className = `bulk-item ${sticker ? "found" : "not-found"}`;
      el.textContent = sticker ? `✅ ${sticker.id} — ${sticker.name}` : `❓ ${code} — não encontrada`;
      preview.appendChild(el);
      if (sticker) found++;
    });

    document.getElementById("bulk-found-count").textContent = `${found} figurinhas encontradas`;
    return lines;
  },

  async confirmBulk(status) {
    const raw = document.getElementById("bulk-input").value;
    const codes = raw.split(/[\n,;]+/).map(s => s.trim().toUpperCase()).filter(Boolean);
    const updates = [];

    codes.forEach(code => {
      ALBUM_DATA.forEach(section => {
        const s = section.stickers.find(s =>
          s.id.toUpperCase() === code || s.number.toUpperCase() === code
        );
        if (s) updates.push({ id: s.id, status, quantity: status === "owned" ? 1 : 2 });
      });
    });

    if (updates.length === 0) {
      this.showToast("Nenhuma figurinha válida encontrada", "error");
      return;
    }

    this.showLoader(true);
    await DB.bulkSet(updates);
    this.showLoader(false);
    this.closeModal("bulk-modal");
    this.refreshCurrentSection();
    this.renderSidebar();
    this.renderStats();
    this.showToast(`✅ ${updates.length} figurinhas atualizadas!`);
  },

  // ---- RESET ----
  async resetCollection() {
    if (!confirm("⚠️ ATENÇÃO: Isso vai apagar TODA a sua coleção. Tem certeza?")) return;
    if (!confirm("Última chance! Confirma o reset total?")) return;
    this.showLoader(true);
    await DB.reset();
    this.showLoader(false);
    this.refreshCurrentSection();
    this.renderSidebar();
    this.renderStats();
    this.showToast("🗑️ Coleção resetada.");
  },

  // ---- TOAST ----
  showToast(msg, type = "success") {
    clearTimeout(this._toastTimer);
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `toast toast-${type} show`;
    this._toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  },

  // ---- MODAIS ----
  closeModal(id) {
    document.getElementById(id).classList.remove("open");
  },

  // ---- EVENTOS GLOBAIS ----
  bindGlobalEvents() {
    // Fechar modais
    document.querySelectorAll(".modal-overlay").forEach(m => {
      m.addEventListener("click", (e) => {
        if (e.target === m) m.classList.remove("open");
      });
    });

    // Busca
    document.getElementById("search-input").addEventListener("input", (e) => {
      this.setSearch(e.target.value);
    });

    // Atalhos de teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
      }
    });

    // Mobile menu toggle
    document.getElementById("menu-toggle").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });

    // Import file
    document.getElementById("import-file").addEventListener("change", (e) => {
      if (e.target.files[0]) this.importJSON(e.target.files[0]);
      e.target.value = "";
    });

    // Dup modal confirmar
    document.getElementById("confirm-dup").addEventListener("click", () => {
      const modal = document.getElementById("dup-modal");
      const stickerId = modal.dataset.stickerId;
      const qty = parseInt(document.getElementById("dup-qty").value) || 2;
      this.setStatus(stickerId, "duplicate", qty);
      this.closeModal("dup-modal");
    });

    // Bulk preview ao digitar
    document.getElementById("bulk-input").addEventListener("input", () => {
      const raw = document.getElementById("bulk-input").value.trim();
      if (raw.length > 2) this.parseBulk();
    });
  }
};

// Inicia quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => App.init());

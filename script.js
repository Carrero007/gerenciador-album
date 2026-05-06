// =============================================================
// ⚙️  CONFIGURAÇÃO — edite apenas esta constante
// =============================================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxsuN--bn4JnOwdq9sjmIbvEzhjHU9eBhb_EWzSIzY-1RuJzmxXgQIynk1E7hwUg5Z8Q/exec';

// =============================================================
// 🔐 AUTENTICAÇÃO — sessão de usuário
// =============================================================
const AUTH = {
  KEY: 'copa26_usuario',

  obter() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || 'null'); }
    catch { return null; }
  },

  limpar() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem('copa26');
  },

  cpf() {
    const u = this.obter();
    return u ? u.cpf : '';
  },

  apelido() {
    const u = this.obter();
    return u ? (u.apelido || u.nome || 'Usuário') : '';
  }
};

// Logout: limpa sessão e volta pro login
function logout() {
  if (!confirm('Deseja sair da sua conta?')) return;
  AUTH.limpar();
  window.location.href = 'index.html';
}

// =============================================================
// DADOS DO ÁLBUM
// =============================================================
function R(pfx, s, e) {
  const a = [];
  for (let i = s; i <= e; i++) a.push({ id:`${pfx}-${i}`, number:`${pfx}-${i}` });
  return a;
}

const ALBUM = [
  { id:'fwc_intro', code:'FWC', name:'Página Inicial · FWC', icon:'🌍', color:'#1B4FA8', grupo:null,
    stickers:[{ id:'FWC-00', number:'FWC-00' }, ...R('FWC',1,8)] },
  { id:'mex', code:'MEX', name:'Grupo A · México',        icon:'🇲🇽', color:'#006847', grupo:'A', stickers:R('MEX',1,20) },
  { id:'rsa', code:'RSA', name:'Grupo A · África do Sul', icon:'🇿🇦', color:'#009B77', grupo:'A', stickers:R('RSA',1,20) },
  { id:'kor', code:'KOR', name:'Grupo A · Coreia do Sul', icon:'🇰🇷', color:'#CD2E3A', grupo:'A', stickers:R('KOR',1,20) },
  { id:'cze', code:'CZE', name:'Grupo A · Rep. Tcheca',   icon:'🇨🇿', color:'#D7141A', grupo:'A', stickers:R('CZE',1,20) },
  { id:'can', code:'CAN', name:'Grupo B · Canadá', icon:'🇨🇦', color:'#D80621', grupo:'B', stickers:R('CAN',1,20) },
  { id:'bih', code:'BIH', name:'Grupo B · Bósnia', icon:'🇧🇦', color:'#002868', grupo:'B', stickers:R('BIH',1,20) },
  { id:'qat', code:'QAT', name:'Grupo B · Catar',  icon:'🇶🇦', color:'#8D1B3D', grupo:'B', stickers:R('QAT',1,20) },
  { id:'sui', code:'SUI', name:'Grupo B · Suíça',  icon:'🇨🇭', color:'#D52B1E', grupo:'B', stickers:R('SUI',1,20) },
  { id:'bra', code:'BRA', name:'Grupo C · Brasil',   icon:'🇧🇷', color:'#009C3B', grupo:'C', stickers:R('BRA',1,20) },
  { id:'mar', code:'MAR', name:'Grupo C · Marrocos', icon:'🇲🇦', color:'#C1272D', grupo:'C', stickers:R('MAR',1,20) },
  { id:'hai', code:'HAI', name:'Grupo C · Haiti',    icon:'🇭🇹', color:'#00209F', grupo:'C', stickers:R('HAI',1,20) },
  { id:'sco', code:'SCO', name:'Grupo C · Escócia',  icon:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', color:'#003DA5', grupo:'C', stickers:R('SCO',1,20) },
  { id:'usa', code:'USA', name:'Grupo D · Estados Unidos', icon:'🇺🇸', color:'#002868', grupo:'D', stickers:R('USA',1,20) },
  { id:'par', code:'PAR', name:'Grupo D · Paraguai',       icon:'🇵🇾', color:'#D52B1E', grupo:'D', stickers:R('PAR',1,20) },
  { id:'aus', code:'AUS', name:'Grupo D · Austrália',      icon:'🇦🇺', color:'#00843D', grupo:'D', stickers:R('AUS',1,20) },
  { id:'tur', code:'TUR', name:'Grupo D · Turquia',        icon:'🇹🇷', color:'#E30A17', grupo:'D', stickers:R('TUR',1,20) },
  { id:'ger', code:'GER', name:'Grupo E · Alemanha',        icon:'🇩🇪', color:'#555',    grupo:'E', stickers:R('GER',1,20) },
  { id:'cuw', code:'CUW', name:'Grupo E · Curaçao',         icon:'🇨🇼', color:'#003DA5', grupo:'E', stickers:R('CUW',1,20) },
  { id:'civ', code:'CIV', name:'Grupo E · Costa do Marfim', icon:'🇨🇮', color:'#F77F00', grupo:'E', stickers:R('CIV',1,20) },
  { id:'ecu', code:'ECU', name:'Grupo E · Equador',         icon:'🇪🇨', color:'#C8A800', grupo:'E', stickers:R('ECU',1,20) },
  { id:'ned', code:'NED', name:'Grupo F · Holanda', icon:'🇳🇱', color:'#CC5500', grupo:'F', stickers:R('NED',1,20) },
  { id:'jpn', code:'JPN', name:'Grupo F · Japão',   icon:'🇯🇵', color:'#BC002D', grupo:'F', stickers:R('JPN',1,20) },
  { id:'swe', code:'SWE', name:'Grupo F · Suécia',  icon:'🇸🇪', color:'#006AA7', grupo:'F', stickers:R('SWE',1,20) },
  { id:'tun', code:'TUN', name:'Grupo F · Tunísia', icon:'🇹🇳', color:'#E70013', grupo:'F', stickers:R('TUN',1,20) },
  { id:'bel', code:'BEL', name:'Grupo G · Bélgica',       icon:'🇧🇪', color:'#EF3340', grupo:'G', stickers:R('BEL',1,20) },
  { id:'egy', code:'EGY', name:'Grupo G · Egito',         icon:'🇪🇬', color:'#CE1126', grupo:'G', stickers:R('EGY',1,20) },
  { id:'irn', code:'IRN', name:'Grupo G · Irã',           icon:'🇮🇷', color:'#239F40', grupo:'G', stickers:R('IRN',1,20) },
  { id:'nzl', code:'NZL', name:'Grupo G · Nova Zelândia', icon:'🇳🇿', color:'#00247D', grupo:'G', stickers:R('NZL',1,20) },
  { id:'esp', code:'ESP', name:'Grupo H · Espanha',        icon:'🇪🇸', color:'#AA151B', grupo:'H', stickers:R('ESP',1,20) },
  { id:'cpv', code:'CPV', name:'Grupo H · Cabo Verde',     icon:'🇨🇻', color:'#003893', grupo:'H', stickers:R('CPV',1,20) },
  { id:'ksa', code:'KSA', name:'Grupo H · Arábia Saudita', icon:'🇸🇦', color:'#006C35', grupo:'H', stickers:R('KSA',1,20) },
  { id:'uru', code:'URU', name:'Grupo H · Uruguai',        icon:'🇺🇾', color:'#5AAAE7', grupo:'H', stickers:R('URU',1,20) },
  { id:'fra', code:'FRA', name:'Grupo I · França',  icon:'🇫🇷', color:'#0055A4', grupo:'I', stickers:R('FRA',1,20) },
  { id:'sen', code:'SEN', name:'Grupo I · Senegal', icon:'🇸🇳', color:'#00853F', grupo:'I', stickers:R('SEN',1,20) },
  { id:'irq', code:'IRQ', name:'Grupo I · Iraque',  icon:'🇮🇶', color:'#CE1126', grupo:'I', stickers:R('IRQ',1,20) },
  { id:'nor', code:'NOR', name:'Grupo I · Noruega', icon:'🇳🇴', color:'#EF2B2D', grupo:'I', stickers:R('NOR',1,20) },
  { id:'arg', code:'ARG', name:'Grupo J · Argentina', icon:'🇦🇷', color:'#74ACDF', grupo:'J', stickers:R('ARG',1,20) },
  { id:'alg', code:'ALG', name:'Grupo J · Argélia',   icon:'🇩🇿', color:'#006233', grupo:'J', stickers:R('ALG',1,20) },
  { id:'aut', code:'AUT', name:'Grupo J · Áustria',   icon:'🇦🇹', color:'#ED2939', grupo:'J', stickers:R('AUT',1,20) },
  { id:'jor', code:'JOR', name:'Grupo J · Jordânia',  icon:'🇯🇴', color:'#007A3D', grupo:'J', stickers:R('JOR',1,20) },
  { id:'por', code:'POR', name:'Grupo K · Portugal',    icon:'🇵🇹', color:'#006600', grupo:'K', stickers:R('POR',1,20) },
  { id:'cod', code:'COD', name:'Grupo K · Congo',       icon:'🇨🇩', color:'#007FFF', grupo:'K', stickers:R('COD',1,20) },
  { id:'uzb', code:'UZB', name:'Grupo K · Uzbequistão', icon:'🇺🇿', color:'#1EB53A', grupo:'K', stickers:R('UZB',1,20) },
  { id:'col', code:'COL', name:'Grupo K · Colômbia',    icon:'🇨🇴', color:'#C8A800', grupo:'K', stickers:R('COL',1,20) },
  { id:'eng', code:'ENG', name:'Grupo L · Inglaterra', icon:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', color:'#CF081F', grupo:'L', stickers:R('ENG',1,20) },
  { id:'cro', code:'CRO', name:'Grupo L · Croácia',    icon:'🇭🇷', color:'#CC0000', grupo:'L', stickers:R('CRO',1,20) },
  { id:'gha', code:'GHA', name:'Grupo L · Gana',       icon:'🇬🇭', color:'#006B3F', grupo:'L', stickers:R('GHA',1,20) },
  { id:'pan', code:'PAN', name:'Grupo L · Panamá',     icon:'🇵🇦', color:'#005293', grupo:'L', stickers:R('PAN',1,20) },
  { id:'fwc_hist', code:'FWC', name:'FIFA World Cup History', icon:'🏆', color:'#1B4FA8', grupo:null, stickers:R('FWC',9,19) },
  { id:'coca', code:'CC', name:'Coca-Cola', icon:'🥤', color:'#F40009', grupo:'_esp',
    stickers:[
      {id:'CC1',number:'CC1',special:true},{id:'CC2',number:'CC2',special:true},
      {id:'CC3',number:'CC3',special:true},{id:'CC4',number:'CC4',special:true},
      {id:'CC5',number:'CC5',special:true},{id:'CC6',number:'CC6',special:true},
      {id:'CC7',number:'CC7',special:true},{id:'CC8',number:'CC8',special:true},
      {id:'CC9',number:'CC9',special:true},{id:'CC10',number:'CC10',special:true},
      {id:'CC11',number:'CC11',special:true},{id:'CC12',number:'CC12',special:true},
      {id:'CC13',number:'CC13',special:true},{id:'CC14',number:'CC14',special:true}
    ]
  }
];

// Índice rápido id → { sec, s }
const IDX = {};
ALBUM.forEach(sec => sec.stickers.forEach(s => IDX[s.id.toUpperCase()] = { sec, s }));

// =============================================================
// BANCO DE DADOS — modelo qty-only
// qty = 0 → faltando | qty = 1 → tenho | qty > 1 → repetidas
// =============================================================
const DB = {
  _d: {},

  load() {
    try {
      // Chave por CPF: evita mistura de dados entre usuários no mesmo dispositivo
      const key = 'copa26_' + (AUTH.cpf() || 'local');
      const raw = JSON.parse(localStorage.getItem(key) || '{}');
      // Migração de schema antigo (status+qty) → qty-only
      this._d = {};
      for (const [id, val] of Object.entries(raw)) {
        if (typeof val === 'number') { this._d[id] = val; continue; }
        if (val && typeof val === 'object') {
          if (val.status === 'miss' || !val.status) continue;
          const q = val.qty || 1;
          this._d[id] = val.status === 'dup' ? q : 1;
        }
      }
    } catch { this._d = {}; }
  },

  _save() {
    const key = 'copa26_' + (AUTH.cpf() || 'local');
    localStorage.setItem(key, JSON.stringify(this._d));
  },

  // Retorna qty (0 = faltando)
  getQty(id) { return this._d[id.toUpperCase()] || 0; },

  // Status derivado do qty
  getStatus(id) {
    const q = this.getQty(id);
    if (q === 0) return 'miss';
    if (q === 1) return 'owned';
    return 'dup';
  },

  // get() mantido para compatibilidade com lógica legada
  get(id) {
    const qty = this.getQty(id);
    if (qty === 0) return { status:'miss', qty:0 };
    if (qty === 1) return { status:'owned', qty:1 };
    return { status:'dup', qty };
  },

  // Define qty diretamente
  async setQty(id, qty) {
    id = id.toUpperCase();
    if (qty <= 0) delete this._d[id];
    else this._d[id] = qty;
    this._save();
    SyncQueue.push(id, qty);
  },

  // Acumula qty (para bulk acumular)
  async addQty(id, delta) {
    id = id.toUpperCase();
    const cur = this._d[id] || 0;
    const next = Math.max(0, cur + delta);
    if (next <= 0) delete this._d[id];
    else this._d[id] = next;
    this._save();
    SyncQueue.push(id, this._d[id] || 0);
  },

  // Wrapper de compatibilidade para set(id, status, qty)
  async set(id, status, qty=1) {
    id = id.toUpperCase();
    let q;
    if (status === 'miss') q = 0;
    else if (status === 'dup') q = Math.max(2, qty);
    else q = 1; // owned
    await this.setQty(id, q);
  },

  async bulkSet(ids, status, qty=1, accumulate=false) {
    const normalized = ids.map(i => i.toUpperCase());
    if (accumulate) {
      // Conta frequência dos ids no array
      const freq = {};
      normalized.forEach(id => freq[id] = (freq[id]||0)+1);
      for (const [id, count] of Object.entries(freq)) {
        if (status === 'miss') { delete this._d[id]; SyncQueue.push(id, 0); }
        else {
          const cur = this._d[id] || 0;
          const next = cur + count;
          this._d[id] = next;
          SyncQueue.push(id, next);
        }
      }
    } else {
      // Modo definir: deduplica
      const uniq = [...new Set(normalized)];
      for (const id of uniq) {
        let q;
        if (status === 'miss') q = 0;
        else if (status === 'dup') q = Math.max(2, qty);
        else q = 1;
        if (q <= 0) delete this._d[id]; else this._d[id] = q;
        SyncQueue.push(id, this._d[id] || 0);
      }
    }
    this._save();
  },

  async syncFromSheets() {
    const r = await _apiFetch({ acao:'listar' });
    if (!r?.ok) return { ok:false };
    this._d = {};
    (r.dados||[]).forEach(item => {
      if (!item.id) return;
      const q = parseInt(item.qty)||1;
      if (item.status && item.status !== 'miss') {
        const id = item.id.toUpperCase();
        this._d[id] = item.status === 'dup' ? q : 1;
      }
    });
    this._save();
    return { ok:true, total:r.dados.length };
  },

  async reset() {
    this._d = {};
    this._save();
    _apiFetch({ acao:'reset' });
  },

  stats() {
    let owned=0, miss=0, dup=0, total=0;
    ALBUM.forEach(sec => sec.stickers.forEach(s => {
      total++;
      const q = this.getQty(s.id);
      if (q === 0) miss++;
      else {
        owned++;
        if (q > 1) dup += q - 1;
      }
    }));
    return { owned, miss, dup, total, pct:Math.round(owned/total*100) };
  },

  exportJSON() { return JSON.stringify(this._d, null, 2); },

  importJSON(str) {
    try {
      const d = JSON.parse(str);
      if (typeof d !== 'object') return false;
      this._d = d; this._save();
      _apiFetch({ acao:'importar', dados:JSON.stringify(d) });
      return true;
    } catch { return false; }
  }
};

// =============================================================
// FILA DE SINCRONIZAÇÃO — retry automático com backoff
// =============================================================
const SyncQueue = {
  _queue: [],
  _processing: false,
  _retryDelay: 2000,

  push(id, qty) {
    // Remove entradas anteriores do mesmo id
    this._queue = this._queue.filter(i => i.id !== id);
    this._queue.push({ id, qty, attempts:0 });
    this._processNext();
  },

  async _processNext() {
    if (this._processing || !this._queue.length) return;
    if (!SCRIPT_URL || SCRIPT_URL.includes('COLE_AQUI')) return;
    this._processing = true;
    setSyncDot('syncing');

    while (this._queue.length) {
      const item = this._queue[0];
      const status = item.qty === 0 ? 'miss' : item.qty === 1 ? 'owned' : 'dup';
      const r = await _apiFetch({ acao:'salvar', id:item.id, status, qty:item.qty });
      if (r?.ok) {
        this._queue.shift();
        this._retryDelay = 2000;
      } else {
        item.attempts++;
        if (item.attempts >= 5) {
          console.warn('[Copa26] Desistindo de sincronizar', item.id);
          this._queue.shift();
        } else {
          // Backoff exponencial
          await new Promise(res => setTimeout(res, this._retryDelay));
          this._retryDelay = Math.min(this._retryDelay * 2, 30000);
        }
      }
    }
    this._processing = false;
    setSyncDot(this._queue.length === 0 ? 'ok' : 'error');
  }
};

// Fetch com timeout — injeta CPF automaticamente em todas requisições
async function _apiFetch(params) {
  if (!SCRIPT_URL || SCRIPT_URL.includes('COLE_AQUI')) return null;
  // Injeta CPF do usuário logado em todas as chamadas (exceto login/cadastrar)
  const authed = ['listar','salvar','bulkSalvar','reset','importar'];
  if (authed.includes(params.acao)) {
    const cpf = AUTH.cpf();
    if (!cpf) { console.warn('[Copa26] CPF não disponível'); return null; }
    params = { cpf, ...params };
  }
  try {
    const qs = Object.entries(params).map(([k,v])=>`${k}=${encodeURIComponent(v)}`).join('&');
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 10000);
    const r = await fetch(`${SCRIPT_URL}?${qs}`, { signal:ctrl.signal });
    clearTimeout(tid);
    return await r.json();
  } catch(e) {
    console.warn('[Copa26]', e.message);
    return null;
  }
}

// =============================================================
// UNDO
// =============================================================
let _undoStack = [];  // [{ id, prevQty }]

function pushUndo(id, prevQty) {
  _undoStack.push({ id, prevQty });
  if (_undoStack.length > 20) _undoStack.shift();
  document.getElementById('undo-btn').style.display = 'block';
}

async function undoLast() {
  const entry = _undoStack.pop();
  if (!entry) return;
  await DB.setQty(entry.id, entry.prevQty);
  afterChange(entry.id);
  toast('↩ Ação desfeita');
  if (!_undoStack.length) document.getElementById('undo-btn').style.display = 'none';
}

// =============================================================
// HISTÓRICO
// =============================================================
const HISTORY = {
  _key() { return 'copa26_hist_' + (AUTH.cpf() || 'local'); },

  _load() {
    try { return JSON.parse(localStorage.getItem(this._key()) || '{"trocas":[],"bulk":[]}'); }
    catch { return { trocas:[], bulk:[] }; }
  },

  _save(d) { localStorage.setItem(this._key(), JSON.stringify(d)); },

  pushTroca(stkId, prevQty) {
    const d = this._load();
    d.trocas.unshift({ id:stkId, prevQty, novaQty:prevQty-1, ts:Date.now() });
    if (d.trocas.length > 100) d.trocas = d.trocas.slice(0, 100);
    this._save(d);
  },

  pushBulk(validCodes, status) {
    const d = this._load();
    const freq = {};
    validCodes.forEach(c => freq[c] = (freq[c]||0)+1);
    const uniq = Object.keys(freq);
    d.bulk.unshift({ codes:uniq, freq, status, total:validCodes.length, ts:Date.now() });
    if (d.bulk.length > 50) d.bulk = d.bulk.slice(0, 50);
    this._save(d);
  },

  getTrocas() { return this._load().trocas; },
  getBulk()   { return this._load().bulk; },

  clear() { localStorage.removeItem(this._key()); }
};

function _tsLabel(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
}

function openHistory(tab='trocas') {
  closeModal('modal-menu');
  _renderHistory(tab);
  document.getElementById('modal-history').classList.add('open');
}

function _renderHistory(tab) {
  // tabs
  ['trocas','bulk'].forEach(t => {
    document.getElementById('htab-'+t).classList.toggle('on', t===tab);
  });
  const body = document.getElementById('history-body');
  body.innerHTML = '';

  if (tab === 'trocas') {
    const list = HISTORY.getTrocas();
    if (!list.length) {
      body.innerHTML = '<div class="hist-empty">Nenhuma troca registrada ainda.</div>';
      return;
    }
    list.forEach(item => {
      const entry = IDX[item.id];
      const secName = entry ? entry.sec.name : '—';
      const div = document.createElement('div'); div.className='hist-item';
      div.innerHTML = `
        <div class="hi-top">
          <span class="hi-id">${item.id}</span>
          <span class="hi-badge trade">🤝 Troca</span>
          <span class="hi-ts">${_tsLabel(item.ts)}</span>
        </div>
        <div class="hi-sub">${secName} · ${item.prevQty}× → ${item.novaQty}×${item.novaQty===1?' (permanece no álbum)':''}</div>`;
      body.appendChild(div);
    });
  } else {
    const list = HISTORY.getBulk();
    if (!list.length) {
      body.innerHTML = '<div class="hist-empty">Nenhuma entrada em massa ainda.</div>';
      return;
    }
    const statusLabel = { owned:'✅ Tenho', dup:'🔄 +Repetidas', miss:'❌ Faltando' };
    list.forEach(item => {
      const div = document.createElement('div'); div.className='hist-item';
      const chips = item.codes.slice(0,12).map(c => {
        const f = item.freq[c];
        return `<span class="hi-chip">${c}${f>1?` ×${f}`:''}</span>`;
      }).join('') + (item.codes.length>12?`<span class="hi-chip more">+${item.codes.length-12}</span>`:'');
      div.innerHTML = `
        <div class="hi-top">
          <span class="hi-badge bulk">${statusLabel[item.status]||item.status}</span>
          <span class="hi-count">${item.codes.length} únicas · ${item.total} total</span>
          <span class="hi-ts">${_tsLabel(item.ts)}</span>
        </div>
        <div class="hi-chips">${chips}</div>`;
      body.appendChild(div);
    });
  }
}

// =============================================================
// ESTADO
// =============================================================
let curSection = null;
let curFilter  = 'all';
let secView    = 'grid';
let gbView     = 'grid';
let curSearch  = '';
let gbSearch   = '';
let gbFilter   = { status:'all', group:'section' };
let activeStkId = null;
let tradeStkId  = null;  // figurinha selecionada para troca
let curQty      = 2;
let curTab      = 'section';
let bulkMode    = 'add';   // always accumulate
let _searchDebounce = null;

// =============================================================
// INIT
// =============================================================
async function init() {
  // ── Verificação de autenticação ──
  const usuario = AUTH.obter();
  if (!usuario || !usuario.cpf) {
    window.location.href = 'index.html';
    return;
  }

  // Estilos do histórico
  const _hstyle = document.createElement('style');
  _hstyle.textContent = `
    .hist-item{background:var(--surf);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:8px}
    .hi-top{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:5px}
    .hi-id{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.9rem;color:var(--t1)}
    .hi-badge{font-family:'Barlow Condensed',sans-serif;font-size:.7rem;font-weight:700;padding:2px 7px;border-radius:4px;letter-spacing:.5px}
    .hi-badge.trade{background:rgba(14,165,160,.15);color:var(--turq)}
    .hi-badge.bulk{background:rgba(240,180,41,.12);color:var(--yellow)}
    .hi-ts{font-size:.65rem;color:var(--t3);margin-left:auto}
    .hi-count{font-size:.72rem;color:var(--t2)}
    .hi-sub{font-size:.72rem;color:var(--t3)}
    .hi-chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
    .hi-chip{font-family:'Barlow Condensed',sans-serif;font-size:.72rem;font-weight:700;padding:2px 6px;border-radius:3px;background:var(--surf2);color:var(--t2);border:1px solid var(--border)}
    .hi-chip.more{color:var(--t3)}
    .hist-empty{text-align:center;color:var(--t3);font-size:.82rem;padding:32px 0}
  `;
  document.head.appendChild(_hstyle);

  DB.load();
  buildNav();
  buildDrawer();

  // Mostra o apelido no subtítulo do header — permanece visível em todas as seções
  const apelido = usuario.apelido || usuario.nome;
  const subEl = document.getElementById('hd-sub');
  if (subEl) subEl.textContent = `📖 Álbum do(a) ${apelido}`;

  const hasScript = SCRIPT_URL && !SCRIPT_URL.includes('COLE_AQUI');

  if (hasScript) {
    setSyncDot('syncing');
    setBadge('syncing');
    const r = await DB.syncFromSheets();
    setSyncDot(r.ok ? 'ok' : 'error');
    setBadge(r.ok ? 'sheets' : 'local');
    document.getElementById('sync-txt').textContent =
      r.ok ? `☁️ Sheets (${r.total} fig.)` : '💾 Cache local (Sheets offline)';
  } else {
    setSyncDot('idle');
    setBadge('local');
    document.getElementById('sync-txt').textContent = '💾 Local (sem Apps Script)';
  }

  showSection(ALBUM[0].id);

  document.getElementById('loader').style.display = 'none';
  document.getElementById('app').style.display    = 'flex';
  document.getElementById('bulk-ta').addEventListener('input', bulkPreview);
}

// =============================================================
// ABAS
// =============================================================
function switchTab(btn) {
  curTab = btn.dataset.tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('on', b===btn));
  document.getElementById('panel-section').classList.toggle('hidden', curTab!=='section');
  document.getElementById('panel-global').classList.toggle('active', curTab==='global');
  if (curTab==='global') renderGlobal();
}

function switchTabMobile(tab) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (btn) switchTab(btn);
  document.querySelectorAll('.bnav-btn').forEach(b=>b.classList.remove('on'));
  const bnBtn = document.getElementById('bn-'+tab);
  if (bnBtn) bnBtn.classList.add('on');
}

// =============================================================
// NAV LATERAL
// =============================================================
function buildNav() {
  const nav  = document.getElementById('nav');
  const logo = nav.querySelector('.nav-logo');
  nav.innerHTML=''; nav.appendChild(logo);

  const gb = document.createElement('div');
  gb.className='nav-item'; gb.dataset.id='__global';
  gb.innerHTML=`<span class="ni-icon">🔎</span><span class="ni-code">BUSCA</span>`;
  gb.addEventListener('click',()=>switchTab(document.querySelector('.tab-btn[data-tab="global"]')));
  nav.appendChild(gb);
  const s0=document.createElement('div'); s0.className='nav-sep'; nav.appendChild(s0);

  let lastGrp=null;
  ALBUM.forEach(sec => {
    const m = sec.name.match(/Grupo ([A-L])/);
    const g = m ? m[1] : null;
    if (g && g!==lastGrp) {
      if (lastGrp) { const sep=document.createElement('div');sep.className='nav-sep';nav.appendChild(sep); }
      const lbl=document.createElement('div');lbl.className='nav-group-label';lbl.textContent='GRP '+g;nav.appendChild(lbl);
      lastGrp=g;
    } else if (!g && lastGrp) {
      const sep=document.createElement('div');sep.className='nav-sep';nav.appendChild(sep);
      lastGrp=null;
    }
    const item=document.createElement('div');
    item.className='nav-item'; item.dataset.id=sec.id;
    item.innerHTML=`<span class="ni-icon">${sec.icon}</span><span class="ni-code">${sec.code}</span><span class="ni-dot"></span>`;
    item.addEventListener('click',()=>{
      switchTab(document.querySelector('.tab-btn[data-tab="section"]'));
      showSection(sec.id);
    });
    nav.appendChild(item);
  });
  updateNavDots();
}

function updateNavDots() {
  ALBUM.forEach(sec=>{
    const el=document.querySelector(`.nav-item[data-id="${sec.id}"]`);
    if(!el) return;
    const n=sec.stickers.filter(s=>DB.getQty(s.id)>0).length;
    el.classList.toggle('has-progress', n>0);
    el.classList.toggle('complete', n===sec.stickers.length);
  });
}

// =============================================================
// DRAWER
// =============================================================
function buildDrawer() {
  const list=document.getElementById('drawer-list');
  list.innerHTML='';
  ALBUM.forEach(sec=>{
    const n=sec.stickers.filter(s=>DB.getQty(s.id)>0).length;
    const pct=Math.round(n/sec.stickers.length*100);
    const item=document.createElement('div');
    item.className='dr-item'+(sec.id===curSection?.id?' active':'');
    item.innerHTML=`<span class="dr-icon">${sec.icon}</span><div class="dr-info"><div class="dr-name">${sec.name}</div><div class="dr-prog"><div class="dr-bar" style="width:${pct}%;background:${sec.color}"></div></div></div><span class="dr-count">${n}/${sec.stickers.length}</span>`;
    item.addEventListener('click',()=>{
      switchTab(document.querySelector('.tab-btn[data-tab="section"]'));
      showSection(sec.id); closeDrawer();
    });
    list.appendChild(item);
  });
}
function openDrawer()  { document.getElementById('drawer').classList.add('open'); }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }

// =============================================================
// SEÇÃO
// =============================================================
function showSection(secId) {
  curSection=ALBUM.find(s=>s.id===secId);
  if (!curSection) return;
  document.getElementById('hd-title').textContent=`${curSection.icon} ${curSection.name}`;
  // hd-sub mantém o apelido do usuário — não sobrescreve aqui
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active', el.dataset.id===secId));
  curSearch=''; document.getElementById('search').value='';
  renderSection(); updateStats(); updateNavDots(); buildDrawer();
}

function renderSection() {
  const grid=document.getElementById('grid');
  grid.className=secView==='grid'?'stk-grid':'stk-list';
  grid.innerHTML='';
  const items=getSectionFiltered();
  document.getElementById('tb-count').textContent=`${items.length} / ${curSection.stickers.length}`;
  if (!items.length) { grid.innerHTML=`<div class="empty-state"><span class="ei">🔍</span><p>Nenhuma figurinha</p></div>`; return; }
  items.forEach((s,i)=>{
    const card=makeCard(s,curSection,secView,i,false);
    card.addEventListener('click',ev=>{ if(ev.target.closest('.sc-actions,.sc-list-actions')) return; openStkModal(s.id); });
    grid.appendChild(card);
  });
}

function getSectionFiltered() {
  if (!curSection) return [];
  const terms = curSearch.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return curSection.stickers.filter(s=>{
    const qty = DB.getQty(s.id);
    const mf = curFilter==='all' ? true
      : curFilter==='owned' ? qty===1
      : curFilter==='miss'  ? qty===0
      : curFilter==='dup'   ? qty>1 : true;
    if (!mf) return false;
    if (!terms.length) return true;
    const hay = `${s.id} ${s.number} ${curSection.name} ${curSection.code}`.toLowerCase();
    return terms.every(t => hay.includes(t));
  });
}

// =============================================================
// BUSCA GLOBAL
// =============================================================
function renderGlobal() {
  const grid     = document.getElementById('gb-grid');
  const grupoSel = document.getElementById('gb-grupo')?.value||'';
  const q        = gbSearch.toLowerCase().trim();
  const terms    = q.split(/\s+/).filter(Boolean);
  const groupBy  = gbFilter.group;

  grid.innerHTML='';

  const results=[];
  ALBUM.forEach(sec=>{
    if (grupoSel) {
      if (grupoSel==='_esp' && sec.grupo!=='_esp') return;
      if (grupoSel!=='_esp' && sec.grupo!==grupoSel) return;
    }
    sec.stickers.forEach(s=>{
      const qty = DB.getQty(s.id);
      const st  = qty===0?'miss':qty===1?'owned':'dup';
      const mStatus = gbFilter.status==='all' ? true
        : gbFilter.status==='owned' ? qty===1
        : gbFilter.status==='miss'  ? qty===0
        : gbFilter.status==='dup'   ? qty>1 : true;
      if (!mStatus) return;
      const hay=[s.id, s.number, sec.name, sec.code, sec.icon].join(' ').toLowerCase();
      if (terms.length && !terms.every(t=>hay.includes(t))) return;
      results.push({s,sec,st,qty});
    });
  });

  const totalAlbum=ALBUM.reduce((n,sec)=>n+sec.stickers.length,0);
  document.getElementById('gb-count').textContent=results.length;
  const ownedCount=results.filter(r=>r.qty>0).length;
  document.getElementById('gb-pct').textContent=results.length
    ? `${ownedCount} coletadas (${Math.round(ownedCount/results.length*100)}%)` : `de ${totalAlbum} figurinhas`;

  if (!results.length) {
    grid.innerHTML=`<div class="empty-state"><span class="ei">🔍</span><p>Nenhuma figurinha encontrada</p></div>`;
    return;
  }

  if (groupBy==='section') {
    const grouped={};
    results.forEach(r=>{ if(!grouped[r.sec.id]) grouped[r.sec.id]={sec:r.sec,items:[]}; grouped[r.sec.id].items.push(r); });
    Object.values(grouped).forEach(({sec,items})=>{
      const secOwned=sec.stickers.filter(s=>DB.getQty(s.id)>0).length;
      const pct=Math.round(secOwned/sec.stickers.length*100);
      const g=document.createElement('div'); g.className='gb-group';
      g.innerHTML=`
        <div class="gb-group-hd">
          <span class="ghd-icon">${sec.icon}</span>
          <span class="ghd-name">${sec.name}</span>
          <div class="ghd-stats">
            <span>${secOwned}/${sec.stickers.length}</span>
            <div class="ghd-bar-wrap"><div class="ghd-bar" style="width:${pct}%;background:${sec.color}"></div></div>
          </div>
        </div>
        <div class="${gbView==='grid'?'stk-grid':'stk-list'}" id="gg-${sec.id}"></div>`;
      grid.appendChild(g);
      const sub=g.querySelector(`#gg-${sec.id}`);
      items.forEach((r,i)=>{
        const card=makeCard(r.s,r.sec,gbView,i,false);
        card.addEventListener('click',ev=>{ if(ev.target.closest('.sc-actions,.sc-list-actions')) return; openStkModal(r.s.id); });
        sub.appendChild(card);
      });
    });
  } else {
    const wrap=document.createElement('div');
    wrap.className=gbView==='grid'?'stk-grid':'stk-list';
    results.forEach((r,i)=>{
      const card=makeCard(r.s,r.sec,gbView,i,true);
      card.addEventListener('click',ev=>{ if(ev.target.closest('.sc-actions,.sc-list-actions')) return; openStkModal(r.s.id); });
      wrap.appendChild(card);
    });
    grid.appendChild(wrap);
  }
}

// =============================================================
// FACTORY DE CARD — usa qty-only
// =============================================================
function makeCard(s, sec, view, idx, showTag) {
  const qty  = DB.getQty(s.id);
  const st   = qty===0?'miss':qty===1?'owned':'dup';
  const dups = qty>1 ? qty-1 : 0;
  const ico  = qty===0?'❌':qty===1?'✅':'🔄';

  const card=document.createElement('div');
  card.className=`sc ${st}${s.special?' special':''}`;
  card.style.animationDelay=Math.min(idx*8,160)+'ms';
  card.dataset.id=s.id;

  if (view==='grid') {
    card.innerHTML=`
      <div class="sc-grid-inner">
        <div class="sc-hd" style="background:${sec.color}18;border-color:${sec.color}28">
          <span class="sc-num">${s.number}</span>
          ${s.special?'<span class="sc-star">⭐</span>':''}
        </div>
        <div class="sc-bd">
          <span class="sc-icon">${ico}</span>
          ${dups>0?`<span class="sc-dup-badge">+${dups}×</span>`:''}
          ${showTag?`<span class="sc-sec-tag">${sec.icon} ${sec.code}</span>`:''}
        </div>
        <div class="sc-actions">
          <button class="sa-btn" onclick="quickSet(event,'${s.id}','owned')">✅</button>
          <button class="sa-btn" onclick="quickDup(event,'${s.id}')">🔄</button>
          ${dups>0?`<button class="sa-btn sa-trade" onclick="quickTrade(event,'${s.id}')" title="Registrar troca">🤝</button>`:''}
          <button class="sa-btn" onclick="quickSet(event,'${s.id}','miss')">❌</button>
        </div>
      </div>`;
  } else {
    const label = showTag
      ? `${sec.icon} ${sec.name.split('·')[1]?.trim()||sec.code}`
      : (sec.name.split('·')[1]?.trim()||'');
    card.innerHTML=`
      <div class="sc-list-inner">
        <div class="sc-list-left" style="border-left-color:${sec.color}50">
          ${s.special?'<span style="font-size:.7rem">⭐</span>':''}
          <span>${s.number}</span>
        </div>
        <div class="sc-list-body">
          <span class="sc-list-name">${label}</span>
          ${dups>0?`<span class="sc-list-dup">+${dups}×</span>`:'<span class="sc-list-dup" style="display:none"></span>'}
          <span class="sc-list-status">${ico}</span>
        </div>
        <div class="sc-list-actions">
          <button class="sa-btn" onclick="quickSet(event,'${s.id}','owned')">✅</button>
          <button class="sa-btn" onclick="quickDup(event,'${s.id}')">🔄</button>
          ${dups>0?`<button class="sa-btn sa-trade" onclick="quickTrade(event,'${s.id}')" title="Registrar troca">🤝</button>`:''}
          <button class="sa-btn" onclick="quickSet(event,'${s.id}','miss')">❌</button>
        </div>
      </div>`;
  }
  return card;
}

// =============================================================
// AÇÕES RÁPIDAS
// =============================================================
async function quickSet(evt, id, status) {
  evt.stopPropagation();
  const prev = DB.getQty(id);
  pushUndo(id, prev);
  await DB.set(id, status, 1);
  afterChange(id);
  toast(status==='owned'?'✅ Tenho!':'❌ Faltando');
}
function quickDup(evt, id) { evt.stopPropagation(); openQtyModal(id); }
async function quickTrade(evt, id) {
  evt.stopPropagation();
  await registerTrade(id);
}

// Clique no card alterna: faltando → tenho → repetida → faltando
async function cycleMark(id) {
  const prev = DB.getQty(id);
  pushUndo(id, prev);
  let next;
  if (prev === 0) next = 1;
  else if (prev === 1) next = 2;
  else next = 0;
  await DB.setQty(id, next);
  afterChange(id);
  const msgs = ['❌ Faltando', '✅ Tenho!', '🔄 Repetida (+1)'];
  toast(msgs[next] || '✅');
}

function afterChange(id) {
  updateStats(); updateNavDots();
  if (curTab==='section') {
    const keep=getSectionFiltered().map(s=>s.id);
    if (keep.includes(id)) refreshCard(id);
    else renderSection();
  } else {
    renderGlobal();
  }
  buildDrawer();
}

function refreshCard(id) {
  const card=document.querySelector(`.sc[data-id="${id}"]`);
  if (!card) return;
  const qty=DB.getQty(id);
  const st=qty===0?'miss':qty===1?'owned':'dup';
  const dups=qty>1?qty-1:0;
  const ico=qty===0?'❌':qty===1?'✅':'🔄';
  card.className=`sc ${st}${card.classList.contains('special')?' special':''}`;
  card.classList.add('just-marked');
  setTimeout(()=>card.classList.remove('just-marked'), 300);
  const scico=card.querySelector('.sc-icon'); if(scico) scico.textContent=ico;
  const lsts=card.querySelector('.sc-list-status'); if(lsts) lsts.textContent=ico;
  const badge=card.querySelector('.sc-dup-badge');
  if (badge) { badge.textContent=`+${dups}×`; badge.style.display=dups>0?'':'none'; }
  const ldups=card.querySelector('.sc-list-dup');
  if (ldups) { ldups.textContent=`+${dups}×`; ldups.style.display=dups>0?'':'none'; }
}

// =============================================================
// MODAL FIGURINHA
// =============================================================
function openStkModal(id) {
  activeStkId=id;
  const entry=IDX[id.toUpperCase()]; if(!entry) return;
  const {sec,s}=entry;
  const qty=DB.getQty(id);
  document.getElementById('stk-num').textContent=s.number;
  document.getElementById('stk-sec').textContent=sec.name;
  document.getElementById('stk-hd').style.background=`linear-gradient(135deg,${sec.color},${sec.color}99)`;
  document.getElementById('stk-status').textContent=
    qty===0?'❌ Faltando':
    qty===1?'✅ Tenho (1 no álbum)':
    `🔄 Repetida — ${qty}× total · ${qty-1}× para troca`;

  // Mostra/esconde botão de troca
  const tradeBtn=document.getElementById('stk-trade-btn');
  if (tradeBtn) {
    tradeBtn.style.display = qty > 1 ? '' : 'none';
  }
  document.getElementById('modal-stk').classList.add('open');
}

async function stkAction(action) {
  if (!activeStkId) return;
  closeModal('modal-stk');
  if (action==='dup') { openQtyModal(activeStkId); return; }
  const prev=DB.getQty(activeStkId);
  pushUndo(activeStkId, prev);
  await DB.set(activeStkId, action, 1);
  afterChange(activeStkId);
  toast(action==='owned'?'✅ Marcada como Tenho!':'❌ Marcada como Faltando');
}

// Registra uma troca: desconta 1 repetida (qty-1), mínimo = 1 (permanece no álbum)
async function registerTrade(id) {
  const qty = DB.getQty(id);
  if (qty < 2) { toast('Sem repetidas para trocar!', true); return; }
  closeModal('modal-stk');
  pushUndo(id, qty);
  const next = qty - 1;
  await DB.setQty(id, next);
  afterChange(id);
  const restantes = next - 1;
  toast(next > 1
    ? `🤝 Troca registrada! Restam ${restantes} repetida${restantes>1?'s':''}.`
    : '🤝 Troca registrada! Figurinha permanece no álbum.'
  );
}

// =============================================================
// MODAL QTY (ex-dupModal)
// =============================================================
function openQtyModal(id) {
  activeStkId=id;
  const cur=DB.getQty(id);
  curQty=Math.max(2, cur);
  document.getElementById('qty-stk-id').textContent=id;
  document.getElementById('qty-val').textContent=curQty;
  document.getElementById('modal-qty').classList.add('open');
}
function changeQty(d) {
  curQty=Math.max(2, Math.min(99, curQty+d));
  document.getElementById('qty-val').textContent=curQty;
}
async function confirmQty() {
  if (!activeStkId) return;
  const prev=DB.getQty(activeStkId);
  pushUndo(activeStkId, prev);
  await DB.setQty(activeStkId, curQty);
  afterChange(activeStkId);
  closeModal('modal-qty');
  toast(`🔄 ${curQty}× registradas! (${curQty-1} para troca)`);
}

// =============================================================
// BULK — sempre acumula (repetições contam)
// =============================================================
function openBulk() {
  document.getElementById('bulk-ta').value='';
  document.getElementById('bulk-preview').innerHTML='';
  document.getElementById('bulk-found').textContent='';
  document.getElementById('modal-bulk').classList.add('open');
}

function bulkPreview() {
  const raw = document.getElementById('bulk-ta').value;
  const codes = parseCodesRaw(raw);
  const uniq  = [...new Set(codes)];
  const prev  = document.getElementById('bulk-preview'); prev.innerHTML='';
  let found=0;
  const freq={};
  codes.forEach(c=>freq[c]=(freq[c]||0)+1);
  uniq.slice(0,30).forEach(c=>{
    const entry=IDX[c]; const el=document.createElement('div');
    const count=freq[c]||1;
    if (entry) {
      const curQtyEntry=DB.getQty(c);
      const nextQty = curQtyEntry+count;
      el.className='bp-item bp-ok';
      el.textContent=`✅ ${entry.s.id} — ${entry.sec.name}${count>1?` (${count}×)`:''}`
        +(curQtyEntry>0?` (atual: ${curQtyEntry} → ${nextQty})`:'');
      found++;
    } else {
      el.className='bp-item bp-err';
      el.textContent=`❓ ${c} — não encontrada`;
    }
    prev.appendChild(el);
  });
  if (uniq.length>30) {
    const more=document.createElement('div');
    more.className='bp-item'; more.style.color='var(--t3)';
    more.textContent=`… e mais ${uniq.length-30} figurinhas`;
    prev.appendChild(more);
  }
  document.getElementById('bulk-found').textContent=codes.length
    ?`${found} de ${uniq.length} únicos encontrados (${codes.length} total)` :'';
}

function parseCodesRaw(raw) {
  return raw.split(/[\n,;\s]+/).map(s=>s.trim().toUpperCase()).filter(Boolean);
}
function parseCodes(raw) { return [...new Set(parseCodesRaw(raw))]; }

async function bulkConfirm(status) {
  const raw=document.getElementById('bulk-ta').value;
  const allCodes=parseCodesRaw(raw);
  const validCodes=allCodes.filter(c=>IDX[c]);
  if (!validCodes.length) { toast('Nenhum código válido!',true); return; }
  HISTORY.pushBulk(validCodes, status);
  await DB.bulkSet(validCodes, status, 2, true); // sempre acumula
  updateStats(); updateNavDots(); buildDrawer();
  if (curTab==='section') renderSection(); else renderGlobal();
  closeModal('modal-bulk');
  const uniqCount=[...new Set(validCodes)].length;
  toast(`${uniqCount} figurinhas atualizadas! (acumulado)`);
}

// =============================================================
// LISTA DE TROCA
// =============================================================
function openTrade() {
  closeModal('modal-menu');
  const haves=[];  // { id, qty, extra }
  const needs=[];  // { id }
  ALBUM.forEach(sec=>sec.stickers.forEach(s=>{
    const q=DB.getQty(s.id);
    if (q>1) haves.push({ id:s.id, sec, qty:q, extra:q-1 });
    else if (q===0) needs.push({ id:s.id, sec });
  }));

  const el=document.getElementById('trade-content');
  el.innerHTML='';

  // Tenho para troca
  const haveDiv=document.createElement('div'); haveDiv.className='trade-section';
  haveDiv.innerHTML=`<div class="trade-section-title">📦 Tenho para troca (${haves.length} figurinhas, ${haves.reduce((a,h)=>a+h.extra,0)} cópias extras)</div>
    <p class="trade-tip">Clique numa figurinha para registrar uma troca (−1 repetida)</p>`;
  if (haves.length) {
    const chips=document.createElement('div'); chips.className='trade-chips';
    haves.forEach(h=>{
      const c=document.createElement('span'); c.className='trade-chip has-qty';
      c.dataset.id=h.id;
      c.innerHTML=`${h.id} <span class="tc-qty">${h.extra}×</span>`;
      c.title=`Registrar troca de ${h.id} (−1 repetida)`;
      c.addEventListener('click', async ()=>{
        const curQtyVal=DB.getQty(h.id);
        if (curQtyVal < 2) { toast('Sem repetidas para trocar!', true); return; }
        pushUndo(h.id, curQtyVal);
        HISTORY.pushTroca(h.id, curQtyVal);
        const next=curQtyVal-1;
        await DB.setQty(h.id, next);
        afterChange(h.id);
        // Atualiza o chip na lista de troca
        const newExtra=next-1;
        if (newExtra <= 0) {
          c.remove();
          // Reconta
          const remaining=haveDiv.querySelectorAll('.trade-chip');
          haveDiv.querySelector('.trade-section-title').textContent=`📦 Tenho para troca (${remaining.length} figurinhas)`;
        } else {
          c.querySelector('.tc-qty').textContent=`${newExtra}×`;
        }
        const restMsg=next>1?`${newExtra} repetida${newExtra>1?'s':''} restante${newExtra>1?'s':''}`:'figurinha permanece no álbum';
        toast(`🤝 Troca de ${h.id} registrada! ${restMsg}.`);
      });
      chips.appendChild(c);
    });
    haveDiv.appendChild(chips);
  } else {
    haveDiv.innerHTML+=`<div class="trade-empty">Nenhuma figurinha repetida ainda.</div>`;
  }
  el.appendChild(haveDiv);

  // Preciso
  const needDiv=document.createElement('div'); needDiv.className='trade-section';
  needDiv.innerHTML=`<div class="trade-section-title">❌ Preciso (${needs.length} faltando)</div>`;
  if (needs.length) {
    const chips=document.createElement('div'); chips.className='trade-chips';
    needs.forEach(n=>{
      const c=document.createElement('span'); c.className='trade-chip missing';
      c.textContent=n.id;
      chips.appendChild(c);
    });
    needDiv.appendChild(chips);
  } else {
    needDiv.innerHTML+=`<div class="trade-empty">🎉 Álbum completo!</div>`;
  }
  el.appendChild(needDiv);

  document.getElementById('modal-trade').classList.add('open');
}

function copyTrade() {
  const haves=[], needs=[];
  ALBUM.forEach(sec=>sec.stickers.forEach(s=>{
    const q=DB.getQty(s.id);
    if (q>1) haves.push(`${s.id} (${q-1}×)`);
    else if (q===0) needs.push(s.id);
  }));
  const txt=`📦 TENHO PARA TROCA:\n${haves.join(', ')||'Nenhuma'}\n\n❌ PRECISO:\n${needs.join(', ')||'Nenhuma'}`;
  navigator.clipboard.writeText(txt).then(()=>toast('📋 Lista copiada!')).catch(()=>toast('Erro ao copiar',true));
}

// =============================================================
// INSIGHTS
// =============================================================
function openInsights() {
  closeModal('modal-menu');
  const body=document.getElementById('insights-body');
  body.innerHTML='';

  // Agrupa por grupo
  const groups={};
  ALBUM.forEach(sec=>{
    if (!sec.grupo || sec.grupo==='_esp') return;
    if (!groups[sec.grupo]) groups[sec.grupo]={ secs:[], total:0, owned:0, miss:0 };
    const g=groups[sec.grupo];
    g.secs.push(sec);
    sec.stickers.forEach(s=>{
      g.total++;
      const q=DB.getQty(s.id);
      if (q>0) g.owned++; else g.miss++;
    });
  });

  // Grupo mais próximo de completar
  const sorted=Object.entries(groups).sort((a,b)=>(b[1].owned/b[1].total)-(a[1].owned/a[1].total));
  const closest=sorted[0];
  if (closest) {
    const [gid,gd]=closest;
    const pct=Math.round(gd.owned/gd.total*100);
    const hl=document.createElement('div'); hl.className='insight-highlight';
    hl.innerHTML=`<div class="ih-label">🏆 Grupo mais próximo de completar</div>
      <div class="ih-val">Grupo ${gid} — ${pct}% completo (${gd.miss} faltando)</div>`;
    body.appendChild(hl);
  }

  // Próximas figurinhas alvo (5 seções mais próximas de completar, pegar faltantes)
  const targets=[];
  ALBUM.forEach(sec=>{
    if (!sec.grupo || sec.grupo==='_esp') return;
    const total=sec.stickers.length;
    const owned=sec.stickers.filter(s=>DB.getQty(s.id)>0).length;
    const pct=owned/total;
    if (pct>=0.7 && pct<1) {
      sec.stickers.filter(s=>DB.getQty(s.id)===0).forEach(s=>targets.push({ id:s.id, sec }));
    }
  });
  if (targets.length) {
    const th=document.createElement('div'); th.className='insight-highlight';
    th.innerHTML=`<div class="ih-label">🎯 Próximas figurinhas alvo (seções 70%+ completas)</div>
      <div class="target-chips">${targets.slice(0,20).map(t=>`<span class="target-chip">${t.id}</span>`).join('')}</div>`;
    body.appendChild(th);
  }

  // Progresso por grupo
  sorted.forEach(([gid, gd])=>{
    const pct=Math.round(gd.owned/gd.total*100);
    const color=pct>=80?'#22c55e':pct>=50?'#f0b429':'#60a5fa';
    const div=document.createElement('div'); div.className='insight-group';
    div.innerHTML=`
      <div class="ig-header">
        <span class="ig-icon">📊</span>
        <span class="ig-name">Grupo ${gid}</span>
        <span class="ig-pct">${pct}%</span>
      </div>
      <div class="ig-bar-wrap"><div class="ig-bar" style="width:${pct}%;background:${color}"></div></div>
      <div class="ig-stats">
        <span>✅ <strong>${gd.owned}</strong> coletadas</span>
        <span>❌ <strong>${gd.miss}</strong> faltando</span>
        <span>📦 <strong>${gd.total}</strong> total</span>
      </div>`;
    body.appendChild(div);
  });

  document.getElementById('modal-insights').classList.add('open');
}

// =============================================================
// FILTROS / VIEW
// =============================================================
function setFilter(btn) {
  curFilter=btn.dataset.f;
  document.querySelectorAll('.fp-btn').forEach(b=>b.classList.toggle('on',b===btn));
  renderSection();
}
function setView(btn, ctx) {
  const v=btn.dataset.v;
  if (ctx==='sec') { secView=v; renderSection(); }
  else             { gbView=v; renderGlobal(); }
  btn.closest('.view-grp').querySelectorAll('.vg-btn').forEach(b=>b.classList.toggle('on',b===btn));
}
// Debounce na busca
function onSearch(q) {
  clearTimeout(_searchDebounce);
  _searchDebounce=setTimeout(()=>{ curSearch=q; renderSection(); }, 250);
}
function onGlobalSearch(q) {
  clearTimeout(_searchDebounce);
  _searchDebounce=setTimeout(()=>{
    gbSearch=q;
    document.getElementById('gb-clear').classList.toggle('vis',q.length>0);
    renderGlobal();
  }, 250);
}
function clearGlobal() {
  gbSearch=''; document.getElementById('gb-search').value='';
  document.getElementById('gb-clear').classList.remove('vis');
  renderGlobal();
}
function setGF(btn) {
  const field=btn.dataset.gf, val=btn.dataset.v;
  gbFilter[field]=val;
  document.querySelectorAll(`.gf-btn[data-gf="${field}"]`).forEach(b=>b.classList.toggle('on',b===btn));
  renderGlobal();
}

// =============================================================
// STATS
// =============================================================
function updateStats() {
  const st=DB.stats();
  document.getElementById('s-owned').textContent=st.owned;
  document.getElementById('s-miss').textContent=st.miss;
  document.getElementById('s-dup').textContent=st.dup;
  document.getElementById('s-total').textContent=st.total;
  document.getElementById('prog-bar').style.width=st.pct+'%';
  document.getElementById('prog-pct').textContent=st.pct+'%';
}

// =============================================================
// MODAIS / MENU
// =============================================================
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function openMenu()     { document.getElementById('modal-menu').classList.add('open'); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open')); });

// =============================================================
// SYNC / STATUS
// =============================================================
function setSyncDot(state) {
  const d=document.getElementById('sync-status-icon');
  if(d) d.className='sync-dot '+state;
}

async function manualSync() {
  if (!SCRIPT_URL||SCRIPT_URL.includes('COLE_AQUI')) { toast('Configure o SCRIPT_URL no código!',true); return; }
  setSyncDot('syncing'); setBadge('syncing');
  const r=await DB.syncFromSheets();
  setSyncDot(r.ok?'ok':'error');
  setBadge(r.ok?'sheets':'local');
  document.getElementById('sync-txt').textContent=r.ok?`☁️ Sheets (${r.total} fig.)`:'❌ Falha';
  if (r.ok) { renderSection(); updateStats(); updateNavDots(); buildDrawer(); if(curTab==='global') renderGlobal(); }
  toast(r.ok?`☁️ Sincronizado! ${r.total} figurinhas.`:'Falha na sincronização',!r.ok);
  closeModal('modal-menu');
}

function setBadge(src) {
  const b=document.getElementById('src-badge');
  if (src==='sheets') { b.textContent='☁️ Google Sheets'; b.className='sbar-src cfg-status sheets'; }
  else if (src==='syncing') { b.innerHTML='<span class="sync-spinner"></span> Sincronizando...'; b.className='sbar-src cfg-status sheets'; }
  else { b.textContent='💾 Local'; b.className='sbar-src cfg-status local'; }
}

// =============================================================
// PDF EXPORT
// =============================================================
function exportPDF(type) {
  const sections=[];
  let totalCount=0;

  if (type==='trade') {
    // Exportar lista de troca
    const haves=[], needs=[];
    ALBUM.forEach(sec=>sec.stickers.forEach(s=>{
      const q=DB.getQty(s.id);
      if (q>1) haves.push({ id:s.id, extra:q-1 });
      else if (q===0) needs.push({ id:s.id });
    }));
    const st=DB.stats();
    const now=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
    const html=`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Copa 2026 · Lista de Troca</title>
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Barlow',sans-serif;background:#fff;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact;}.page{max-width:800px;margin:0 auto;padding:40px 36px 60px}.title{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;margin-bottom:6px}.sub{font-size:12px;color:#888;margin-bottom:28px;border-bottom:2px solid #111;padding-bottom:16px}.sec-title{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:10px;margin-top:20px}.chips{display:flex;flex-wrap:wrap;gap:5px}.chip{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;padding:3px 9px;border-radius:4px;background:#f5f5f5;color:#222;border:1px solid #e8e8e8}.chip.dup{background:#fff8e6;border-color:#fcd34d;color:#92400e}.footer{margin-top:32px;padding-top:12px;border-top:1px solid #eee;font-size:10px;color:#bbb;font-family:'Barlow Condensed',sans-serif}</style></head>
    <body><div class="page"><div class="title">🔄 Lista de Troca — Copa 2026</div><div class="sub">Gerado em ${now} · ${haves.length} para troca · ${needs.length} precisando</div>
    <div class="sec-title">📦 TENHO PARA TROCA (${haves.reduce((a,h)=>a+h.extra,0)} cópias)</div>
    <div class="chips">${haves.map(h=>`<span class="chip dup">${h.id} ${h.extra}×</span>`).join('')||'Nenhuma'}</div>
    <div class="sec-title">❌ PRECISO (${needs.length})</div>
    <div class="chips">${needs.map(n=>`<span class="chip">${n.id}</span>`).join('')||'Álbum completo!'}</div>
    <div class="footer">COPA 2026 · ÁLBUM MANAGER · ${now}</div></div>
    <script>window.onload=()=>window.print();<\/script></body></html>`;
    const w=window.open('','_blank','width=900,height=700');
    w.document.write(html); w.document.close();
    toast('📄 PDF de troca pronto!');
    return;
  }

  ALBUM.forEach(sec=>{
    const items=[];
    sec.stickers.forEach(s=>{
      const q=DB.getQty(s.id);
      if (type==='miss' && q===0) { items.push({ id:s.id }); totalCount++; }
      if (type==='dup' && q>1)    { items.push({ id:s.id, qty:q-1 }); totalCount++; }
    });
    if (items.length) sections.push({ sec, items });
  });

  if (!totalCount) { toast('Nenhuma figurinha nessa categoria!', true); return; }

  const isMiss=type==='miss';
  const title=isMiss?'Figurinhas Faltando':'Figurinhas Repetidas';
  const accent=isMiss?'#f87171':'#f0b429';
  const accentBg=isMiss?'rgba(248,113,113,0.08)':'rgba(240,180,41,0.08)';
  const emoji=isMiss?'❌':'🔄';
  const now=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
  const st=DB.stats();

  const secBlocks=sections.map(({sec,items})=>{
    const chips=items.map(it=>`<span class="chip">${it.id}${it.qty?` <span class="qty">+${it.qty}×</span>`:''}</span>`).join('');
    return `<div class="sec-block"><div class="sec-hd"><span class="sec-icon">${sec.icon}</span><span class="sec-name">${sec.name}</span><span class="sec-count">${items.length}</span></div><div class="chips">${chips}</div></div>`;
  }).join('');

  const html=`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Copa 2026 · ${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Barlow',sans-serif;background:#fff;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact;}.page{max-width:800px;margin:0 auto;padding:40px 36px 60px}.report-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #111}.report-eyebrow{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin-bottom:8px}.report-title{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;color:#111;line-height:1.1}.report-title span{color:${accent}}.report-date{font-size:12px;color:#888;margin-top:6px}.report-badge{background:${accent};color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;padding:12px 20px;border-radius:8px;line-height:1}.summary{display:flex;gap:12px;margin-bottom:28px}.sum-card{flex:1;padding:14px 16px;border-radius:6px;border:1px solid #eee}.sum-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:4px}.sum-val{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;color:#111}.sum-card.hl{background:${accentBg};border-color:${accent}40}.sum-card.hl .sum-val{color:${accent}}.sec-block{margin-bottom:18px;break-inside:avoid}.sec-hd{display:flex;align-items:center;gap:8px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #f0f0f0}.sec-icon{font-size:16px}.sec-name{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:#444;flex:1}.sec-count{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;background:${accentBg};color:${accent};padding:2px 7px;border-radius:3px}.chips{display:flex;flex-wrap:wrap;gap:5px}.chip{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;padding:4px 9px;border-radius:4px;background:#f5f5f5;color:#222;border:1px solid #e8e8e8}.qty{color:${accent};font-size:11px}.report-footer{margin-top:40px;padding-top:16px;border-top:1px solid #eee;display:flex;justify-content:space-between}.footer-left{font-size:10px;color:#bbb;font-family:'Barlow Condensed',sans-serif;letter-spacing:.5px}@media print{body{background:#fff}.page{padding:20px 24px 40px}.sec-block{break-inside:avoid}}</style></head>
  <body><div class="page"><div class="report-header"><div class="report-left"><div class="report-eyebrow">⚽ Copa do Mundo 2026 · Álbum de Figurinhas</div><div class="report-title">${emoji} <span>${title}</span></div><div class="report-date">Gerado em ${now}</div></div><div class="report-badge">${totalCount}</div></div>
  <div class="summary"><div class="sum-card hl"><div class="sum-label">${isMiss?'Faltando':'Repetidas'}</div><div class="sum-val">${totalCount}</div></div><div class="sum-card"><div class="sum-label">No Álbum</div><div class="sum-val">${st.owned}</div></div><div class="sum-card"><div class="sum-label">Progresso</div><div class="sum-val">${st.pct}%</div></div><div class="sum-card"><div class="sum-label">Total</div><div class="sum-val">${st.total}</div></div></div>
  ${secBlocks}<div class="report-footer"><span class="footer-left">COPA 2026 · ÁLBUM MANAGER</span><span class="footer-left">${now}</span></div></div>
  <script>window.onload=()=>window.print();<\/script></body></html>`;

  const w=window.open('','_blank','width=900,height=700');
  w.document.write(html); w.document.close();
  toast(`📄 PDF de ${totalCount} figurinhas pronto!`);
  closeModal('modal-menu');
}

async function resetAll() {
  if(!confirm('Apagar TODA a coleção?')) return;
  if(!confirm('Tem certeza? Não tem volta.')) return;
  await DB.reset();
  _undoStack=[];
  document.getElementById('undo-btn').style.display='none';
  renderSection(); updateStats(); updateNavDots(); buildDrawer();
  if(curTab==='global') renderGlobal();
  closeModal('modal-menu'); toast('🗑️ Coleção resetada.');
}

// =============================================================
// TOAST
// =============================================================
let _tt;
function toast(msg,err=false) {
  clearTimeout(_tt);
  const el=document.getElementById('toast');
  el.textContent=msg; el.className='show'+(err?' err':'');
  _tt=setTimeout(()=>el.classList.remove('show'),3500);
}

// =============================================================
// START
// =============================================================
window.addEventListener('DOMContentLoaded', init);

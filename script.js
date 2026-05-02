// =============================================================
// ⚙️  CONFIGURAÇÃO — edite apenas esta constante
// Cole a URL do seu Apps Script deployado como "Qualquer pessoa"
// =============================================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJAHxWCfBttfIXsFTenj7rMk6AqJKnaBiutVrWsv5NbvE4Jl86sUet9w8tmQqt9TNZbQ/exec';
// Ex: 'https://script.google.com/macros/s/AKfycb.../exec'
// =============================================================

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

  // GRUPO A
  { id:'mex', code:'MEX', name:'Grupo A · México',        icon:'🇲🇽', color:'#006847', grupo:'A', stickers:R('MEX',1,20) },
  { id:'rsa', code:'RSA', name:'Grupo A · África do Sul', icon:'🇿🇦', color:'#009B77', grupo:'A', stickers:R('RSA',1,20) },
  { id:'kor', code:'KOR', name:'Grupo A · Coreia do Sul', icon:'🇰🇷', color:'#CD2E3A', grupo:'A', stickers:R('KOR',1,20) },
  { id:'cze', code:'CZE', name:'Grupo A · Rep. Tcheca',   icon:'🇨🇿', color:'#D7141A', grupo:'A', stickers:R('CZE',1,20) },
  // GRUPO B
  { id:'can', code:'CAN', name:'Grupo B · Canadá', icon:'🇨🇦', color:'#D80621', grupo:'B', stickers:R('CAN',1,20) },
  { id:'bih', code:'BIH', name:'Grupo B · Bósnia', icon:'🇧🇦', color:'#002868', grupo:'B', stickers:R('BIH',1,20) },
  { id:'qat', code:'QAT', name:'Grupo B · Catar',  icon:'🇶🇦', color:'#8D1B3D', grupo:'B', stickers:R('QAT',1,20) },
  { id:'sui', code:'SUI', name:'Grupo B · Suíça',  icon:'🇨🇭', color:'#D52B1E', grupo:'B', stickers:R('SUI',1,20) },
  // GRUPO C
  { id:'bra', code:'BRA', name:'Grupo C · Brasil',   icon:'🇧🇷', color:'#009C3B', grupo:'C', stickers:R('BRA',1,20) },
  { id:'mar', code:'MAR', name:'Grupo C · Marrocos', icon:'🇲🇦', color:'#C1272D', grupo:'C', stickers:R('MAR',1,20) },
  { id:'hai', code:'HAI', name:'Grupo C · Haiti',    icon:'🇭🇹', color:'#00209F', grupo:'C', stickers:R('HAI',1,20) },
  { id:'sco', code:'SCO', name:'Grupo C · Escócia',  icon:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', color:'#003DA5', grupo:'C', stickers:R('SCO',1,20) },
  // GRUPO D
  { id:'usa', code:'USA', name:'Grupo D · Estados Unidos', icon:'🇺🇸', color:'#002868', grupo:'D', stickers:R('USA',1,20) },
  { id:'par', code:'PAR', name:'Grupo D · Paraguai',       icon:'🇵🇾', color:'#D52B1E', grupo:'D', stickers:R('PAR',1,20) },
  { id:'aus', code:'AUS', name:'Grupo D · Austrália',      icon:'🇦🇺', color:'#00843D', grupo:'D', stickers:R('AUS',1,20) },
  { id:'tur', code:'TUR', name:'Grupo D · Turquia',        icon:'🇹🇷', color:'#E30A17', grupo:'D', stickers:R('TUR',1,20) },
  // GRUPO E
  { id:'ger', code:'GER', name:'Grupo E · Alemanha',        icon:'🇩🇪', color:'#555',    grupo:'E', stickers:R('GER',1,20) },
  { id:'cuw', code:'CUW', name:'Grupo E · Curaçao',         icon:'🇨🇼', color:'#003DA5', grupo:'E', stickers:R('CUW',1,20) },
  { id:'civ', code:'CIV', name:'Grupo E · Costa do Marfim', icon:'🇨🇮', color:'#F77F00', grupo:'E', stickers:R('CIV',1,20) },
  { id:'ecu', code:'ECU', name:'Grupo E · Equador',         icon:'🇪🇨', color:'#C8A800', grupo:'E', stickers:R('ECU',1,20) },
  // GRUPO F
  { id:'ned', code:'NED', name:'Grupo F · Holanda', icon:'🇳🇱', color:'#CC5500', grupo:'F', stickers:R('NED',1,20) },
  { id:'jpn', code:'JPN', name:'Grupo F · Japão',   icon:'🇯🇵', color:'#BC002D', grupo:'F', stickers:R('JPN',1,20) },
  { id:'swe', code:'SWE', name:'Grupo F · Suécia',  icon:'🇸🇪', color:'#006AA7', grupo:'F', stickers:R('SWE',1,20) },
  { id:'tun', code:'TUN', name:'Grupo F · Tunísia', icon:'🇹🇳', color:'#E70013', grupo:'F', stickers:R('TUN',1,20) },
  // GRUPO G
  { id:'bel', code:'BEL', name:'Grupo G · Bélgica',       icon:'🇧🇪', color:'#EF3340', grupo:'G', stickers:R('BEL',1,20) },
  { id:'egy', code:'EGY', name:'Grupo G · Egito',         icon:'🇪🇬', color:'#CE1126', grupo:'G', stickers:R('EGY',1,20) },
  { id:'irn', code:'IRN', name:'Grupo G · Irã',           icon:'🇮🇷', color:'#239F40', grupo:'G', stickers:R('IRN',1,20) },
  { id:'nzl', code:'NZL', name:'Grupo G · Nova Zelândia', icon:'🇳🇿', color:'#00247D', grupo:'G', stickers:R('NZL',1,20) },
  // GRUPO H
  { id:'esp', code:'ESP', name:'Grupo H · Espanha',        icon:'🇪🇸', color:'#AA151B', grupo:'H', stickers:R('ESP',1,20) },
  { id:'cpv', code:'CPV', name:'Grupo H · Cabo Verde',     icon:'🇨🇻', color:'#003893', grupo:'H', stickers:R('CPV',1,20) },
  { id:'ksa', code:'KSA', name:'Grupo H · Arábia Saudita', icon:'🇸🇦', color:'#006C35', grupo:'H', stickers:R('KSA',1,20) },
  { id:'uru', code:'URU', name:'Grupo H · Uruguai',        icon:'🇺🇾', color:'#5AAAE7', grupo:'H', stickers:R('URU',1,20) },
  // GRUPO I
  { id:'fra', code:'FRA', name:'Grupo I · França',  icon:'🇫🇷', color:'#0055A4', grupo:'I', stickers:R('FRA',1,20) },
  { id:'sen', code:'SEN', name:'Grupo I · Senegal', icon:'🇸🇳', color:'#00853F', grupo:'I', stickers:R('SEN',1,20) },
  { id:'irq', code:'IRQ', name:'Grupo I · Iraque',  icon:'🇮🇶', color:'#CE1126', grupo:'I', stickers:R('IRQ',1,20) },
  { id:'nor', code:'NOR', name:'Grupo I · Noruega', icon:'🇳🇴', color:'#EF2B2D', grupo:'I', stickers:R('NOR',1,20) },
  // GRUPO J
  { id:'arg', code:'ARG', name:'Grupo J · Argentina', icon:'🇦🇷', color:'#74ACDF', grupo:'J', stickers:R('ARG',1,20) },
  { id:'alg', code:'ALG', name:'Grupo J · Argélia',   icon:'🇩🇿', color:'#006233', grupo:'J', stickers:R('ALG',1,20) },
  { id:'aut', code:'AUT', name:'Grupo J · Áustria',   icon:'🇦🇹', color:'#ED2939', grupo:'J', stickers:R('AUT',1,20) },
  { id:'jor', code:'JOR', name:'Grupo J · Jordânia',  icon:'🇯🇴', color:'#007A3D', grupo:'J', stickers:R('JOR',1,20) },
  // GRUPO K
  { id:'por', code:'POR', name:'Grupo K · Portugal',    icon:'🇵🇹', color:'#006600', grupo:'K', stickers:R('POR',1,20) },
  { id:'cod', code:'COD', name:'Grupo K · Congo',       icon:'🇨🇩', color:'#007FFF', grupo:'K', stickers:R('COD',1,20) },
  { id:'uzb', code:'UZB', name:'Grupo K · Uzbequistão', icon:'🇺🇿', color:'#1EB53A', grupo:'K', stickers:R('UZB',1,20) },
  { id:'col', code:'COL', name:'Grupo K · Colômbia',    icon:'🇨🇴', color:'#C8A800', grupo:'K', stickers:R('COL',1,20) },
  // GRUPO L
  { id:'eng', code:'ENG', name:'Grupo L · Inglaterra', icon:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', color:'#CF081F', grupo:'L', stickers:R('ENG',1,20) },
  { id:'cro', code:'CRO', name:'Grupo L · Croácia',    icon:'🇭🇷', color:'#CC0000', grupo:'L', stickers:R('CRO',1,20) },
  { id:'gha', code:'GHA', name:'Grupo L · Gana',       icon:'🇬🇭', color:'#006B3F', grupo:'L', stickers:R('GHA',1,20) },
  { id:'pan', code:'PAN', name:'Grupo L · Panamá',     icon:'🇵🇦', color:'#005293', grupo:'L', stickers:R('PAN',1,20) },
  // ESPECIAIS
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
// BANCO — localStorage (imediato) + Apps Script (nuvem)
// =============================================================
const DB = {
  _d: {},

  load() {
    try { this._d = JSON.parse(localStorage.getItem('copa26') || '{}'); } catch { this._d = {}; }
  },

  _save() { localStorage.setItem('copa26', JSON.stringify(this._d)); },

  get(id) { return this._d[id.toUpperCase()] || { status:'miss', qty:0 }; },

  async set(id, status, qty=1) {
    id = id.toUpperCase();
    if (status === 'miss') delete this._d[id];
    else this._d[id] = { status, qty };
    this._save();
    _api({ acao:'salvar', id, status, qty });   // fire-and-forget
  },

  async bulkSet(ids, status, qty=1) {
    ids.forEach(id => {
      id = id.toUpperCase();
      if (status === 'miss') delete this._d[id];
      else this._d[id] = { status, qty };
    });
    this._save();
    _api({ acao:'bulkSalvar', ids:JSON.stringify(ids.map(i=>i.toUpperCase())), status, qty });
  },

  async syncFromSheets() {
    const r = await _api({ acao:'listar' });
    if (!r?.ok) return { ok:false };
    this._d = {};
    (r.dados||[]).forEach(item => {
      if (item.id && item.status !== 'miss') {
        this._d[item.id.toUpperCase()] = { status:item.status, qty:item.qty||1 };
      }
    });
    this._save();
    return { ok:true, total:r.dados.length };
  },

  async reset() {
    this._d = {};
    this._save();
    _api({ acao:'reset' });
  },

  stats() {
    let owned=0, miss=0, dup=0, total=0;
    ALBUM.forEach(sec => sec.stickers.forEach(s => {
      total++;
      const e = this.get(s.id);
      if (!e.status || e.status==='miss') miss++;
      else {
        owned++;
        if (e.status==='dup')               dup += (e.qty||1);
        else if (e.status==='owned'&&e.qty>1) dup += e.qty-1;
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
      _api({ acao:'importar', dados:JSON.stringify(d) });
      return true;
    } catch { return false; }
  }
};

// Wrapper fetch → Apps Script
async function _api(params) {
  if (!SCRIPT_URL || SCRIPT_URL.includes('COLE_AQUI')) return null;
  try {
    const qs = Object.entries(params).map(([k,v])=>`${k}=${encodeURIComponent(v)}`).join('&');
    const r = await fetch(`${SCRIPT_URL}?${qs}`);
    return await r.json();
  } catch(e) {
    console.warn('[Copa26]', e.message);
    return null;
  }
}

// =============================================================
// ESTADO
// =============================================================
let curSection = null;
let curFilter  = 'all';
let secView    = 'grid';  // grid|list  para seção
let gbView     = 'grid';  // grid|list  para global
let curSearch  = '';
let gbSearch   = '';
let gbFilter   = { status:'all', group:'section' };
let activeStkId= null;
let dupQty     = 2;
let curTab     = 'section';

// =============================================================
// INIT
// =============================================================
async function init() {
  DB.load();
  buildNav();
  buildDrawer();

  const hasScript = SCRIPT_URL && !SCRIPT_URL.includes('COLE_AQUI');

  if (hasScript) {
    setBadge('syncing');
    const r = await DB.syncFromSheets();
    setBadge(r.ok ? 'sheets' : 'local');
    document.getElementById('sync-txt').textContent =
      r.ok ? `☁️ Sheets (${r.total} fig.)` : '💾 Cache local (Sheets offline)';
  } else {
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
  document.getElementById('panel-global').classList.toggle('active',  curTab==='global');
  if (curTab==='global') renderGlobal();
}

function switchTabMobile(tab) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (btn) switchTab(btn);
  document.querySelectorAll('.bnav-btn').forEach(b=>b.classList.remove('on'));
  document.getElementById('bn-'+tab)?.classList.add('on');
}

// =============================================================
// NAV LATERAL
// =============================================================
function buildNav() {
  const nav  = document.getElementById('nav');
  const logo = nav.querySelector('.nav-logo');
  nav.innerHTML=''; nav.appendChild(logo);

  // Botão Busca Global
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
    const n=sec.stickers.filter(s=>{ const e=DB.get(s.id); return e.status==='owned'||e.status==='dup'; }).length;
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
    const n=sec.stickers.filter(s=>{ const e=DB.get(s.id); return e.status==='owned'||e.status==='dup'; }).length;
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
  document.getElementById('hd-sub').textContent=`${curSection.stickers.length} figurinhas`;
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
  const q=curSearch.toLowerCase();
  return curSection.stickers.filter(s=>{
    const e=DB.get(s.id); const st=e.status||'miss';
    const mf = curFilter==='all' ? true
      : curFilter==='owned' ? st==='owned'
      : curFilter==='miss'  ? st==='miss'
      : curFilter==='dup'   ? (st==='dup'||(st==='owned'&&(e.qty||0)>1)) : true;
    return mf && (!q || s.id.toLowerCase().includes(q) || s.number.toLowerCase().includes(q));
  });
}

// =============================================================
// BUSCA GLOBAL
// =============================================================
function renderGlobal() {
  const grid     = document.getElementById('gb-grid');
  const grupoSel = document.getElementById('gb-grupo')?.value||'';
  const q        = gbSearch.toLowerCase().trim();
  const groupBy  = gbFilter.group;

  grid.innerHTML='';

  // Coleta figurinhas filtradas
  const results=[];
  ALBUM.forEach(sec=>{
    if (grupoSel) {
      if (grupoSel==='_esp' && sec.grupo!=='_esp') return;
      if (grupoSel!=='_esp' && sec.grupo!==grupoSel) return;
    }
    sec.stickers.forEach(s=>{
      const e=DB.get(s.id); const st=e.status||'miss';
      const mStatus = gbFilter.status==='all' ? true
        : gbFilter.status==='owned' ? st==='owned'
        : gbFilter.status==='miss'  ? st==='miss'
        : gbFilter.status==='dup'   ? (st==='dup'||(st==='owned'&&(e.qty||0)>1)) : true;
      if (!mStatus) return;
      const hay=[s.id, s.number, sec.name, sec.code, sec.icon].join(' ').toLowerCase();
      if (q && !hay.includes(q)) return;
      results.push({s,sec,st,e});
    });
  });

  const totalAlbum=ALBUM.reduce((n,sec)=>n+sec.stickers.length,0);
  document.getElementById('gb-count').textContent=results.length;
  const ownedCount=results.filter(r=>r.st==='owned'||r.st==='dup').length;
  document.getElementById('gb-pct').textContent=results.length
    ? `${ownedCount} coletadas (${Math.round(ownedCount/results.length*100)}%)` : `de ${totalAlbum} figurinhas`;

  if (!results.length) {
    grid.innerHTML=`<div class="empty-state"><span class="ei">🔍</span><p>Nenhuma figurinha encontrada</p></div>`;
    return;
  }

  if (groupBy==='section') {
    // Agrupa por seção mantendo a ordem original do álbum
    const grouped={};
    results.forEach(r=>{ if(!grouped[r.sec.id]) grouped[r.sec.id]={sec:r.sec,items:[]}; grouped[r.sec.id].items.push(r); });
    Object.values(grouped).forEach(({sec,items})=>{
      const secOwned=sec.stickers.filter(s=>{ const e=DB.get(s.id); return e.status==='owned'||e.status==='dup'; }).length;
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
    // Lista única
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
// FACTORY DE CARD
// showTag = exibe de qual seção é (usado no global em lista única)
// =============================================================
function makeCard(s, sec, view, idx, showTag) {
  const e   =DB.get(s.id);
  const st  =e.status||'miss';
  const qty =e.qty||0;
  const dups=st==='dup'?qty:(st==='owned'&&qty>1?qty-1:0);
  const ico =st==='owned'?'✅':st==='dup'?'🔄':'❌';

  const card=document.createElement('div');
  card.className=`sc ${st}${s.special?' special':''}`;
  card.style.animationDelay=Math.min(idx*8,160)+'ms';
  card.dataset.id=s.id;

  if (view==='grid') {
    card.innerHTML=`
      <div class="sc-grid-inner">
        <div class="sc-hd" style="background:${sec.color}18;border-color:${sec.color}30">
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
          <button class="sa-btn" onclick="quickSet(event,'${s.id}','miss')">❌</button>
        </div>
      </div>`;
  } else {
    const label = showTag
      ? `${sec.icon} ${sec.name.split('·')[1]?.trim()||sec.code}`
      : (sec.name.split('·')[1]?.trim()||'');
    card.innerHTML=`
      <div class="sc-list-inner">
        <div class="sc-list-left" style="border-color:${sec.color}40">
          ${s.special?'<span style="font-size:.7rem">⭐</span>':''}
          <span>${s.number}</span>
        </div>
        <div class="sc-list-body">
          <span class="sc-list-name">${label}</span>
          ${dups>0?`<span class="sc-list-dup">+${dups}×</span>`:''}
          <span class="sc-list-status">${ico}</span>
        </div>
        <div class="sc-list-actions">
          <button class="sa-btn" onclick="quickSet(event,'${s.id}','owned')">✅</button>
          <button class="sa-btn" onclick="quickDup(event,'${s.id}')">🔄</button>
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
  await DB.set(id, status, 1);
  afterChange(id);
  toast(status==='owned'?'✅ Tenho!':'❌ Faltando');
}
function quickDup(evt, id) { evt.stopPropagation(); openDupModal(id); }

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
  const e=DB.get(id); const st=e.status||'miss';
  const qty=e.qty||0; const dups=st==='dup'?qty:(st==='owned'&&qty>1?qty-1:0);
  const ico=st==='owned'?'✅':st==='dup'?'🔄':'❌';
  card.className=`sc ${st}${card.classList.contains('special')?' special':''}`;
  const scico=card.querySelector('.sc-icon'); if(scico) scico.textContent=ico;
  const lsts=card.querySelector('.sc-list-status'); if(lsts) lsts.textContent=ico;
  const badge=card.querySelector('.sc-dup-badge');
  if (badge) { badge.textContent=`+${dups}×`; badge.style.display=dups>0?'':'none'; }
}

// =============================================================
// MODAL FIGURINHA
// =============================================================
function openStkModal(id) {
  activeStkId=id;
  const entry=IDX[id.toUpperCase()]; if(!entry) return;
  const {sec,s}=entry; const e=DB.get(id); const st=e.status||'miss';
  document.getElementById('stk-num').textContent=s.number;
  document.getElementById('stk-sec').textContent=sec.name;
  document.getElementById('stk-hd').style.background=`linear-gradient(135deg,${sec.color},${sec.color}99)`;
  document.getElementById('stk-status').textContent=
    st==='owned'?`✅ Tenho${e.qty>1?` (${e.qty}×)`:''}`:
    st==='dup'  ?`🔄 Repetida (${e.qty}×)`:'❌ Faltando';
  document.getElementById('modal-stk').classList.add('open');
}

async function stkAction(action) {
  if (!activeStkId) return;
  closeModal('modal-stk');
  if (action==='dup') { openDupModal(activeStkId); return; }
  await DB.set(activeStkId, action, 1);
  afterChange(activeStkId);
  toast(action==='owned'?'✅ Marcada como Tenho!':'❌ Marcada como Faltando');
}

// =============================================================
// MODAL REPETIDA
// =============================================================
function openDupModal(id) {
  activeStkId=id; dupQty=2;
  document.getElementById('dup-id').textContent=id;
  document.getElementById('qty-val').textContent=dupQty;
  document.getElementById('modal-dup').classList.add('open');
}
function changeQty(d) { dupQty=Math.max(2,Math.min(99,dupQty+d)); document.getElementById('qty-val').textContent=dupQty; }
async function confirmDup() {
  if (!activeStkId) return;
  await DB.set(activeStkId,'dup',dupQty);
  afterChange(activeStkId);
  closeModal('modal-dup');
  toast(`🔄 ${dupQty}× registradas!`);
}

// =============================================================
// BULK
// =============================================================
function openBulk() {
  document.getElementById('bulk-ta').value='';
  document.getElementById('bulk-preview').innerHTML='';
  document.getElementById('bulk-found').textContent='';
  document.getElementById('modal-bulk').classList.add('open');
}
function bulkPreview() {
  const codes=parseCodes(document.getElementById('bulk-ta').value);
  const prev=document.getElementById('bulk-preview'); prev.innerHTML='';
  let found=0;
  codes.forEach(c=>{ const entry=IDX[c]; const el=document.createElement('div');
    if (entry) { el.className='bp-item bp-ok'; el.textContent=`✅ ${entry.s.id} — ${entry.sec.name}`; found++; }
    else        { el.className='bp-item bp-err'; el.textContent=`❓ ${c} — não encontrada`; }
    prev.appendChild(el); });
  document.getElementById('bulk-found').textContent=codes.length?`${found} de ${codes.length} encontradas`:'';
}
function parseCodes(raw) {
  return [...new Set(raw.split(/[\n,;]+/).map(s=>s.trim().toUpperCase()).filter(Boolean))];
}
async function bulkConfirm(status) {
  const codes=parseCodes(document.getElementById('bulk-ta').value);
  const valid=codes.filter(c=>IDX[c]);
  if (!valid.length) { toast('Nenhum código válido!',true); return; }
  await DB.bulkSet(valid, status, status==='dup'?2:1);
  updateStats(); updateNavDots(); buildDrawer();
  if (curTab==='section') renderSection(); else renderGlobal();
  closeModal('modal-bulk');
  toast(`${valid.length} figurinhas atualizadas!`);
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
function onSearch(q) { curSearch=q; renderSection(); }
function onGlobalSearch(q) {
  gbSearch=q;
  document.getElementById('gb-clear').classList.toggle('vis',q.length>0);
  renderGlobal();
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
// SYNC
// =============================================================
async function manualSync() {
  if (!SCRIPT_URL||SCRIPT_URL.includes('COLE_AQUI')) { toast('Configure o SCRIPT_URL no código!',true); return; }
  setBadge('syncing');
  const r=await DB.syncFromSheets();
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
// BACKUP
// =============================================================
// PDF EXPORT
// =============================================================
function exportPDF(type) {
  // Gather data grouped by section
  const sections = [];
  let totalCount = 0;
  ALBUM.forEach(sec => {
    const items = [];
    sec.stickers.forEach(s => {
      const e = DB.get(s.id); const st = e.status || 'miss';
      if (type === 'miss' && st === 'miss') { items.push({ id: s.id }); totalCount++; }
      if (type === 'dup') {
        const isDup = st === 'dup' || (st === 'owned' && (e.qty || 0) > 1);
        if (isDup) { const qty = st === 'dup' ? e.qty : e.qty - 1; items.push({ id: s.id, qty }); totalCount++; }
      }
    });
    if (items.length) sections.push({ sec, items });
  });

  if (!totalCount) { toast('Nenhuma figurinha nessa categoria!', true); return; }

  const isMiss = type === 'miss';
  const title  = isMiss ? 'Figurinhas Faltando' : 'Figurinhas Repetidas';
  const accent = isMiss ? '#f43f5e' : '#f59e0b';
  const accentBg = isMiss ? 'rgba(244,63,94,0.08)' : 'rgba(245,158,11,0.08)';
  const emoji  = isMiss ? '❌' : '🔄';
  const now    = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
  const st     = DB.stats();

  // Build section blocks HTML
  const secBlocks = sections.map(({ sec, items }) => {
    const chips = items.map(it =>
      `<span class="chip">${it.id}${it.qty ? ` <span class="qty">+${it.qty}×</span>` : ''}</span>`
    ).join('');
    return `
      <div class="sec-block">
        <div class="sec-hd">
          <span class="sec-icon">${sec.icon}</span>
          <span class="sec-name">${sec.name}</span>
          <span class="sec-count">${items.length}</span>
        </div>
        <div class="chips">${chips}</div>
      </div>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Copa 2026 · ${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Barlow',sans-serif;background:#fff;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact;}

  .page{max-width:800px;margin:0 auto;padding:40px 36px 60px;}

  /* header */
  .report-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #111;}
  .report-left{}
  .report-eyebrow{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin-bottom:8px;}
  .report-title{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;letter-spacing:-0.5px;color:#111;line-height:1.1;}
  .report-title span{color:${accent}}
  .report-date{font-size:12px;color:#888;margin-top:6px;}
  .report-badge{background:${accent};color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;padding:12px 20px;border-radius:8px;line-height:1;}

  /* summary bar */
  .summary{display:flex;gap:12px;margin-bottom:28px;}
  .sum-card{flex:1;padding:14px 16px;border-radius:6px;border:1px solid #eee;}
  .sum-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:4px;}
  .sum-val{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;color:#111;}
  .sum-card.hl{background:${accentBg};border-color:${accent}40;}
  .sum-card.hl .sum-val{color:${accent};}

  /* section blocks */
  .sec-block{margin-bottom:18px;break-inside:avoid;}
  .sec-hd{display:flex;align-items:center;gap:8px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #f0f0f0;}
  .sec-icon{font-size:16px;line-height:1;}
  .sec-name{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:.3px;color:#444;flex:1;}
  .sec-count{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;background:${accentBg};color:${accent};padding:2px 7px;border-radius:3px;}
  .chips{display:flex;flex-wrap:wrap;gap:5px;}
  .chip{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;padding:4px 9px;border-radius:4px;background:#f5f5f5;color:#222;border:1px solid #e8e8e8;}
  .qty{color:${accent};font-size:11px;}

  /* footer */
  .report-footer{margin-top:40px;padding-top:16px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;}
  .footer-left{font-size:10px;color:#bbb;font-family:'Barlow Condensed',sans-serif;letter-spacing:.5px;}

  @media print{
    body{background:#fff}
    .page{padding:20px 24px 40px}
    .report-title{font-size:26px}
    .sec-block{break-inside:avoid}
  }
</style>
</head>
<body>
<div class="page">

  <div class="report-header">
    <div class="report-left">
      <div class="report-eyebrow">⚽ Copa do Mundo 2026 · Álbum de Figurinhas</div>
      <div class="report-title">${emoji} <span>${title}</span></div>
      <div class="report-date">Gerado em ${now}</div>
    </div>
    <div class="report-badge">${totalCount}</div>
  </div>

  <div class="summary">
    <div class="sum-card hl">
      <div class="sum-label">${isMiss ? 'Faltando' : 'Repetidas'}</div>
      <div class="sum-val">${totalCount}</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">No Álbum</div>
      <div class="sum-val">${st.owned}</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Progresso</div>
      <div class="sum-val">${st.pct}%</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Total</div>
      <div class="sum-val">${st.total}</div>
    </div>
  </div>

  ${secBlocks}

  <div class="report-footer">
    <span class="footer-left">COPA 2026 · ÁLBUM MANAGER</span>
    <span class="footer-left">${now}</span>
  </div>
</div>
<script>window.onload=()=>window.print();<\/script>
</body>
</html>`;

  const w = window.open('', '_blank', 'width=900,height=700');
  w.document.write(html);
  w.document.close();
  toast(`📄 PDF de ${totalCount} figurinhas pronto!`);
  closeModal('modal-menu');
}
async function resetAll() {
  if(!confirm('Apagar TODA a coleção?')) return;
  if(!confirm('Tem certeza? Não tem volta.')) return;
  await DB.reset();
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

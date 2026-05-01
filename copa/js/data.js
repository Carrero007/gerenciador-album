// ============================================================
// DADOS DO ÁLBUM - Copa do Mundo 2026 Panini
// Edite aqui as seções e figurinhas conforme o álbum real
// ============================================================

const ALBUM_DATA = [
  {
    id: "intro",
    name: "Introdução & Mascotes",
    color: "#1B4FA8",
    icon: "🌍",
    stickers: generateRange("FWC", 1, 20)
  },
  {
    id: "venues",
    name: "Estádios & Sedes",
    color: "#1E3A7A",
    icon: "🏟️",
    stickers: generateRange("STA", 1, 30)
  },
  // ---- GRUPO A ----
  { id: "usa", name: "Estados Unidos", color: "#B22234", icon: "🇺🇸", stickers: generateRange("USA", 1, 20) },
  { id: "can", name: "Canadá", color: "#FF0000", icon: "🇨🇦", stickers: generateRange("CAN", 1, 20) },
  { id: "mex", name: "México", color: "#006847", icon: "🇲🇽", stickers: generateRange("MEX", 1, 20) },
  { id: "grpA4", name: "Grupo A - Time 4", color: "#2A52BE", icon: "🏴", stickers: generateRange("GA4", 1, 20) },
  // ---- GRUPO B ----
  { id: "bra", name: "Brasil", color: "#009C3B", icon: "🇧🇷", stickers: generateRange("BRA", 1, 20) },
  { id: "arg", name: "Argentina", color: "#74ACDF", icon: "🇦🇷", stickers: generateRange("ARG", 1, 20) },
  { id: "por", name: "Portugal", color: "#006600", icon: "🇵🇹", stickers: generateRange("POR", 1, 20) },
  { id: "grpB4", name: "Grupo B - Time 4", color: "#C60B1E", icon: "🏴", stickers: generateRange("GB4", 1, 20) },
  // ---- GRUPO C ----
  { id: "fra", name: "França", color: "#0055A4", icon: "🇫🇷", stickers: generateRange("FRA", 1, 20) },
  { id: "eng", name: "Inglaterra", color: "#CF081F", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stickers: generateRange("ENG", 1, 20) },
  { id: "esp", name: "Espanha", color: "#AA151B", icon: "🇪🇸", stickers: generateRange("ESP", 1, 20) },
  { id: "grpC4", name: "Grupo C - Time 4", color: "#4B0082", icon: "🏴", stickers: generateRange("GC4", 1, 20) },
  // ---- GRUPO D ----
  { id: "ger", name: "Alemanha", color: "#000000", icon: "🇩🇪", stickers: generateRange("GER", 1, 20) },
  { id: "ned", name: "Holanda", color: "#FF6600", icon: "🇳🇱", stickers: generateRange("NED", 1, 20) },
  { id: "bel", name: "Bélgica", color: "#EF3340", icon: "🇧🇪", stickers: generateRange("BEL", 1, 20) },
  { id: "grpD4", name: "Grupo D - Time 4", color: "#228B22", icon: "🏴", stickers: generateRange("GD4", 1, 20) },
  // ---- GRUPO E ----
  { id: "ita", name: "Itália", color: "#009246", icon: "🇮🇹", stickers: generateRange("ITA", 1, 20) },
  { id: "cro", name: "Croácia", color: "#CC0000", icon: "🇭🇷", stickers: generateRange("CRO", 1, 20) },
  { id: "den", name: "Dinamarca", color: "#C60C30", icon: "🇩🇰", stickers: generateRange("DEN", 1, 20) },
  { id: "grpE4", name: "Grupo E - Time 4", color: "#006699", icon: "🏴", stickers: generateRange("GE4", 1, 20) },
  // ---- GRUPO F ----
  { id: "col", name: "Colômbia", color: "#FCD116", icon: "🇨🇴", stickers: generateRange("COL", 1, 20) },
  { id: "mor", name: "Marrocos", color: "#006233", icon: "🇲🇦", stickers: generateRange("MOR", 1, 20) },
  { id: "sen", name: "Senegal", color: "#00853F", icon: "🇸🇳", stickers: generateRange("SEN", 1, 20) },
  { id: "grpF4", name: "Grupo F - Time 4", color: "#8B0000", icon: "🏴", stickers: generateRange("GF4", 1, 20) },
  // ---- GRUPO G ----
  { id: "jpn", name: "Japão", color: "#BC002D", icon: "🇯🇵", stickers: generateRange("JPN", 1, 20) },
  { id: "kor", name: "Coreia do Sul", color: "#CD2E3A", icon: "🇰🇷", stickers: generateRange("KOR", 1, 20) },
  { id: "aus", name: "Austrália", color: "#00843D", icon: "🇦🇺", stickers: generateRange("AUS", 1, 20) },
  { id: "grpG4", name: "Grupo G - Time 4", color: "#FF8C00", icon: "🏴", stickers: generateRange("GG4", 1, 20) },
  // ---- GRUPO H ----
  { id: "uru", name: "Uruguai", color: "#5AAAE7", icon: "🇺🇾", stickers: generateRange("URU", 1, 20) },
  { id: "ecu", name: "Equador", color: "#FFD100", icon: "🇪🇨", stickers: generateRange("ECU", 1, 20) },
  { id: "usa2", name: "Estados Unidos B", color: "#002868", icon: "🇺🇸", stickers: generateRange("USA2", 1, 20) },
  { id: "grpH4", name: "Grupo H - Time 4", color: "#8B4513", icon: "🏴", stickers: generateRange("GH4", 1, 20) },
  // ---- ESPECIAIS ----
  {
    id: "special",
    name: "Figurinhas Especiais",
    color: "#FFB800",
    icon: "⭐",
    stickers: generateRange("ESP", 1, 15, true)
  }
];

function generateRange(prefix, start, end, special = false) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push({
      id: `${prefix}-${i}`,
      number: `${prefix}-${i}`,
      name: `${prefix} ${i}`,
      special: special
    });
  }
  return arr;
}

// Calcula totais
const TOTAL_STICKERS = ALBUM_DATA.reduce((acc, section) => acc + section.stickers.length, 0);

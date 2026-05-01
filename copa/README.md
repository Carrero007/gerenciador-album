# ⚽ Gerenciador de Figurinhas — Copa do Mundo 2026 Panini

> Gerencie sua coleção completa: figurinhas que você tem, faltando e repetidas — com sincronização via Google Sheets e hospedagem no GitHub Pages.

---

## 🗂️ Estrutura de Arquivos

```
album-copa-2026/
├── index.html              ← Página principal do app
├── css/
│   └── style.css           ← Estilos (cores Pantone Copa 2026)
├── js/
│   ├── data.js             ← Dados de todas as figurinhas do álbum
│   ├── db.js               ← Integração Google Sheets + LocalStorage
│   └── app.js              ← Lógica principal do gerenciador
├── google-apps-script.js   ← Código para o backend no Google Sheets
└── README.md               ← Este arquivo
```

---

## 🚀 PASSO A PASSO COMPLETO

### ETAPA 1 — Criar o repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde no canto superior direito)
3. Preencha:
   - **Repository name:** `album-copa-2026` (ou qualquer nome)
   - **Description:** Gerenciador de figurinhas Copa 2026
   - Marque **"Public"**
   - Marque **"Add a README file"**
4. Clique em **"Create repository"**

---

### ETAPA 2 — Enviar os arquivos para o GitHub

#### Opção A — Via interface web (mais fácil)

1. No seu repositório, clique em **"Add file" → "Upload files"**
2. Arraste todos os arquivos e pastas do projeto
3. Clique em **"Commit changes"**

#### Opção B — Via Git (terminal)

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/album-copa-2026.git
cd album-copa-2026

# Copie os arquivos para a pasta clonada
# (substitua pelo caminho onde os arquivos estão)
cp -r /caminho/dos/arquivos/* .

# Envie para o GitHub
git add .
git commit -m "Adiciona gerenciador de figurinhas Copa 2026"
git push origin main
```

---

### ETAPA 3 — Ativar o GitHub Pages

1. No repositório, vá em **Settings** (engrenagem)
2. No menu lateral, clique em **"Pages"**
3. Em **"Source"**, selecione:
   - Branch: `main`
   - Pasta: `/ (root)`
4. Clique em **"Save"**
5. Aguarde ~1-2 minutos e acesse a URL que aparecer:
   ```
   https://SEU_USUARIO.github.io/album-copa-2026/
   ```

✅ **O site já funciona!** Ele vai salvar os dados no navegador (LocalStorage). Para sincronizar com Google Sheets, continue nos próximos passos.

---

### ETAPA 4 — Configurar Google Sheets (opcional, mas recomendado)

#### 4.1 — Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com)
2. Crie uma nova planilha em branco
3. Renomeie a primeira aba para: `colecao`
4. Copie o **ID da planilha** da URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_É_O_ID/edit
   ```

#### 4.2 — Criar o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague tudo que estiver no editor
3. Copie TODO o conteúdo do arquivo `google-apps-script.js`
4. Cole no editor do Apps Script
5. Clique em **💾 Salvar** (ou Ctrl+S)
6. Nomeie o projeto como `Album Copa 2026`

#### 4.3 — Publicar o Apps Script como Web App

1. Clique em **"Implantar" → "Nova implantação"**
2. Clique no ícone de engrenagem ⚙️ e selecione **"App da Web"**
3. Configure:
   - **Descrição:** `Álbum Copa 2026 API`
   - **Executar como:** `Eu mesmo (seu email)`
   - **Quem tem acesso:** `Qualquer pessoa` ← **IMPORTANTE!**
4. Clique em **"Implantar"**
5. **Autorize** o acesso quando solicitado (clique em "Autorizar acesso" e faça login)
6. Copie a **URL da Web App** que aparecer — parece com:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
   ```

#### 4.4 — Conectar o site à planilha

1. Acesse seu site no GitHub Pages
2. Clique no ícone ⚙️ (configurações) no canto superior direito
3. Em **Google Sheets**, preencha:
   - **ID da planilha:** o ID copiado no passo 4.1
   - **URL do Apps Script:** a URL copiada no passo 4.3
4. Clique em **"Salvar e Conectar"**
5. A página vai recarregar — se tudo der certo, verá **"☁️ Google Sheets"** na barra inferior

---

## 🎯 Funcionalidades do Gerenciador

### Marcação de Figurinhas
- ✅ **Tenho** — marca que você possui a figurinha
- 🔄 **Repetida** — registra a quantidade de repetidas
- ❌ **Faltando** — padrão para não coletadas

### Filtros e Busca
- Filtre por: **Todas / Tenho / Faltando / Repetidas**
- Busca por código (ex: `BRA-5`) ou nome
- Visualização em **Grade** ou **Lista**

### Entrada em Massa 📋
- Cole vários códigos de uma vez, separados por vírgula ou linha
- Marque várias figurinhas como "Tenho", "Repetida" ou "Faltando" de uma vez

### Exportação
- 📄 **Lista de Faltando** — arquivo .txt para trocar com amigos
- 🔄 **Lista de Repetidas** — com quantidade de cada uma
- 💾 **Backup JSON** — salva toda a coleção
- 📥 **Importar JSON** — restaura de um backup

### Progresso
- Anel de progresso global na sidebar
- Barra de progresso por seção/time
- Estatísticas em tempo real

---

## 🔧 Personalizar as Figurinhas

O arquivo `js/data.js` contém todas as seções e figurinhas. Edite conforme o álbum real:

```javascript
{
  id: "bra",           // ID único da seção
  name: "Brasil",      // Nome exibido
  color: "#009C3B",    // Cor da seção
  icon: "🇧🇷",          // Emoji/ícone
  stickers: generateRange("BRA", 1, 20)  // Figurinhas BRA-1 até BRA-20
}
```

Para figurinhas individuais com nomes específicos:
```javascript
stickers: [
  { id: "BRA-1",  number: "BRA-1",  name: "Alisson Becker" },
  { id: "BRA-2",  number: "BRA-2",  name: "Éder Militão" },
  // ...
]
```

---

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Funciona offline (dados locais no navegador)
- ✅ Sincronização na nuvem via Google Sheets (opcional)

---

## 🆘 Solução de Problemas

**O site não abre no GitHub Pages:**
- Aguarde até 5 minutos após ativar o Pages
- Verifique se o arquivo `index.html` está na raiz do repositório

**Erro de conexão com Google Sheets:**
- Verifique se o Apps Script foi publicado com acesso "Qualquer pessoa"
- Tente reimplantar o Apps Script com uma nova versão
- O site continua funcionando com dados locais mesmo sem o Sheets

**Dados sumiram:**
- Se usava LocalStorage, verifique se não limpou o cache do navegador
- Use o botão "Exportar Backup" regularmente para segurança!
- Com Google Sheets configurado, os dados ficam seguros na nuvem

---

## 🎨 Cores do Design

| Pantone | Nome | Hex |
|---------|------|-----|
| 18-4247 TCX | Bright Cobalt | `#1B4FA8` |
| 19-4053 TCX | Palace Blue | `#1E3A7A` |
| 13-0858 TCX | Vibrant Yellow | `#FFD700` |
| 15-5217 TCX | Blue Turquoise | `#40B4B4` |

---

*Desenvolvido com ❤️ para fãs da Copa do Mundo 2026*

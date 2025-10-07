<div align="center">

# 🎲 GameLounge_Frontend

### Frontend interativo para entusiastas de jogos de tabuleiro

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

</div>

---

## 📖 Sobre o Projeto

Um **frontend em Next.js** para o **GameLounge** — um site sobre jogos de tabuleiro que lista títulos, permite filtragens e oferece um quiz (NextGame) que recomenda jogos com base no perfil do usuário.

> 💡 Este README foi escrito passo a passo para utilizar o projeto, incluindo instruções detalhadas de instalação, execução e depuração.

---

## 📦 O que este repositório contém

| Componente | Descrição |
|------------|-----------|
| ⚛️ **React + Next.js (App Router)** | Framework moderno com renderização do lado do servidor |
| 📄 **Páginas** (`src/app`) | Home, jogos, nextgame, desenvolvedora |
| 🧩 **Componentes** (`src/components`) | Componentes React reutilizáveis |
| 🎨 **Estilos** | CSS Modules (`*.module.css`) para escopo isolado |
| 📊 **Dados** (`src/data`) | Perguntas e resultados do quiz |

---

## ✅ Pré-requisitos (o que você precisa)

### 1️⃣ Node.js
- 📥 Instalar o **Node.js** (versão LTS recomendada)
- 🔗 Baixe em: https://nodejs.org/
- ✔️ Verifique a instalação:
  ```cmd
  node -v
  npm -v
  ```

### 2️⃣ Editor de Código
- 💻 **VS Code** (recomendado)

### 3️⃣ Terminal
- 🖥️ PowerShell ou Prompt de Comando no Windows

### 4️⃣ Backend/API ⚠️ **OBRIGATÓRIO**

> 🔴 **Importante:** Este frontend depende de um backend local para buscar os jogos!

Antes de rodar este frontend, você **deve** seguir as instruções do repositório do backend para instalar e inicializar a API local. Sem o backend em execução, algumas páginas podem não mostrar dados.

**Repositório do backend:**

🔗 https://github.com/AnaCarolinaFreitas/GameLounge_backend.git

**Passos:**
- ✅ Abra o repositório acima e siga o README dele para instalar dependências e iniciar o servidor
- ✅ Certifique-se de que a API está disponível em `http://localhost:3000/api/games` (ou na porta configurada) antes de usar as páginas `/jogos` e as recomendações do quiz

---

## 🚀 Passo a passo para clonar e rodar (usando CMD e VS Code)

> 📋 Siga estes passos no Windows. O objetivo é clonar o repositório com o **Prompt de Comando (CMD)**, abrir o projeto no **VS Code** e usar o terminal integrado configurado para "Command Prompt (cmd.exe)" antes de instalar dependências e testar a aplicação.

### 1️⃣ Abra o Prompt de Comando (CMD)

- 🪟 No Windows, abra o menu Iniciar
- 🔍 Digite `cmd` e pressione **Enter**

### 2️⃣ Navegue até a pasta onde quer clonar (por exemplo, Desktop)

```cmd
cd Desktop
```

### 3️⃣ Clone o repositório e abra a pasta do projeto

> 💡 Substitua `<endereço do projeto>` e `<nome-do-projeto>` pelo endereço e nome reais.

```cmd
git clone <endereço do projeto>
cd <nome-do-projeto>
```

### 4️⃣ Abra o projeto no VS Code a partir do CMD

```cmd
code .
```

- ✨ O comando `code .` abrirá uma janela do VS Code com a pasta do projeto
- ✅ Após executar `code .`, você pode fechar a janela do Prompt de Comando; o VS Code permanecerá aberto

### 5️⃣ Na janela do VS Code: abra o terminal integrado e use o Command Prompt (cmd.exe)

- 📟 No VS Code, abra o terminal integrado: menu **View → Terminal** (ou use o atalho **``Ctrl+` ``**)
- 🔧 Trocar o perfil padrão do terminal para o Command Prompt (cmd.exe):
  - Clique na **seta** próxima ao botão de **+** no painel do Terminal
  - Selecione **"Select Default Profile"**
  - Escolha **"Command Prompt"**
  - Feche o terminal atual e abra um novo terminal (ícone **+**) — agora ele usará o cmd.exe

### 6️⃣ Instalar dependências (no terminal integrado do VS Code, que agora está em cmd)

```cmd
npm install
```

### 7️⃣ Testar o projeto antes de qualquer alteração (rodar em modo dev)

```cmd
npm run dev
```

- ⏳ Aguarde a mensagem no terminal, por exemplo: `Local: http://localhost:3000`
- 🌐 Abra `http://localhost:3000` no navegador para confirmar que a aplicação está rodando

> ⚠️ **Observação:** Este frontend depende de um backend local para buscar os jogos. Verifique se o backend foi iniciado seguindo as instruções do repositório `GameLounge_backend` antes de testar `/jogos` e o quiz.

---

## 📂 Entendendo a estrutura (rápido)

```
GameLounge_Frontend/
│
├── 📁 src/app/          → Páginas e rotas (app router)
├── 📁 src/components/   → Componentes React reutilizáveis
├── 📁 public/images/    → Imagens públicas acessíveis pela aplicação
└── 📁 src/data/         → Perguntas e resultados do quiz
```

---

## 🐛 Debugging e problemas comuns (guia para iniciantes)

### ❌ Se não aparecerem jogos na página `/jogos`:
- ✅ Verifique se o **backend está rodando** em `http://localhost:3000/api/games`
- 🔍 Abra **DevTools** (`F12`) → **Network** para ver a requisição e a resposta

### 💥 Se a página quebrou e o terminal mostra erro ao compilar:
- 📖 Leia a mensagem no terminal — normalmente aponta **arquivo e linha** com erro
- 🔧 Erros comuns:
  - ❌ Import errado
  - ❌ CSS com sintaxe inválida
  - ❌ Componente sem `export default`

### 🖼️ Se imagens não aparecem:
- 📁 Verifique `public/images` e os paths usados no componente `Image`

---

## 🎯 Notas sobre o Quiz (NextGame)

📊 **Como funciona:**
- 📝 O quiz usa `src/data/perguntas.js` e `src/data/resultados.js`
- 🧮 As recomendações são baseadas numa **heurística simples** que compara as respostas com campos dos jogos (`name`, `genres`, `description`) e soma pontos
- 💾 Os jogos são lidos do `sessionStorage` (salvo pela página `/jogos`) ou buscados pela API se não houver jogos salvos

### 🔍 Se as recomendações parecerem estranhas:

1. 🛠️ Abra **DevTools** (`F12`) → **Application** → **Session Storage** → verifique a chave `jogos`
2. ✅ Veja se existem múltiplos objetos e se os campos (`name`, `genres`, `description`) fazem sentido

---

## ⚡ Testes rápidos (comandos úteis)

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | 🚀 Start em modo desenvolvimento |
| `npm run build` | 📦 Build para produção |
| `npm run start` | ▶️ Start em produção (após build) |

---

<div align="center">

### 🎮 Feito com ❤️ por [Ana Carolina Freitas](https://github.com/AnaCarolinaFreitas)

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**

</div>

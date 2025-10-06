# GameLounge_Frontend

Um frontend em Next.js para o GameLounge — um site sobre jogos de tabuleiro que lista títulos, permite filtragens e oferece um quiz (NextGame) que recomenda jogos com base no perfil do usuário.

Este README foi escrito passo a passo para iniciantes, incluindo instruções detalhadas de instalação, execução e depuração.

---

## O que este repositório contém

- Frontend em React + Next.js (App Router)
- Páginas em `src/app` (home, jogos, nextgame, desenvolvedora, etc.)
- Componentes em `src/components`
- Estilos com CSS Modules (`*.module.css`)
- Dados de apoio em `src/data` (perguntas, resultados)

---

## Pré-requisitos (o que você precisa)

1. Instalar o Node.js (versão LTS recomendada). Baixe em: https://nodejs.org/
   - Verifique: `node -v` e `npm -v` no terminal.
2. Editor de código (recomendado: VS Code).
3. Acesso ao terminal (PowerShell no Windows está ok).
4. (Obrigatório) Backend/API: antes de rodar este frontend, você deve seguir as instruções do repositório do backend para instalar e inicializar a API local. Sem o backend em execução, algumas páginas podem não mostrar dados.

   Repositório do backend e passo a passo:

   https://github.com/AnaCarolinaFreitas/GameLounge_backend.git

   - Abra o repositório acima, siga o README dele para instalar dependências e iniciar o servidor.
   - Certifique-se de que a API está disponível em `http://localhost:3000/api/games` (ou na porta configurada) antes de usar as páginas `/jogos` e as recomendações do quiz.

---

## Passo a passo para rodar (explicado para iniciantes)

1) Abrir o terminal e navegar até a pasta onde quer clonar o projeto

- No Windows abra o PowerShell e execute (exemplo):

  ```powershell
  cd C:\Users\SeuUsuario\Documents\Projetos
  ```

2) Clonar o repositório

```powershell
git clone https://github.com/AnaCarolinaFreitas/GameLounge_Frontend.git
cd GameLounge_Frontend
```

3) Instalar dependências (uma única vez)

```powershell
npm install
```

Isso criará a pasta `node_modules` e instalará tudo que o projeto precisa.

4) Rodar em modo desenvolvimento

```powershell
npm run dev
```

- Aguarde a mensagem no terminal: `Local: http://localhost:3000` (ou porta alternativa).
- Abra o navegador e acesse `http://localhost:3000`.

5) Testar as páginas principais

- Home: `/`
- Jogos: `/jogos` (pode buscar a API para popular os jogos)
- Quiz (NextGame): `/nextgame` (responda todas as perguntas, clique em "Ver Resultado")
- Desenvolvedora: `/desenvolvedora`

---

## Entendendo a estrutura (rápido)

- `src/app` — páginas e rotas (app router)
- `src/components` — componentes React reutilizáveis
- `public/images` — imagens públicas acessíveis pela aplicação
- `src/data` — perguntas e resultados do quiz

---

## Debugging e problemas comuns (guia para iniciantes)

- Se não aparecerem jogos na página `/jogos`:
  - Verifique se o backend está rodando em `http://localhost:3000/api/games`.
  - Abra DevTools (F12) → Network para ver a requisição e a resposta.

- Se a página quebrou e o terminal mostra erro ao compilar:
  - Leia a mensagem no terminal — normalmente aponta arquivo e linha com erro.
  - Erros comuns: import errado, CSS com sintaxe inválida, componente sem export default.

- Se imagens não aparecem:
  - Verifique `public/images` e os paths usados no componente `Image`.

---

## Notas sobre o Quiz (NextGame)

- O quiz usa `src/data/perguntas.js` e `src/data/resultados.js`.
- As recomendações são baseadas numa heurística simples que compara as respostas com campos dos jogos (name, genres, description) e soma pontos.
- Os jogos são lidos do `sessionStorage` (salvo pela página `/jogos`) ou buscados pela API se não houver jogos salvos.

Se as recomendações parecerem estranhas, siga estes passos:

1. Abra DevTools → Application → Session Storage → verifique a chave `jogos`.
2. Veja se existem múltiplos objetos e se os campos (name, genres, description) fazem sentido.
3. Se precisar, cole aqui os logs do console para eu analisar.

---

## Testes rápidos (comandos úteis)

```powershell
npm run dev        # start em modo dev
npm run build      # build para produção
npm run start      # start em produção (após build)
```

---

## Como contribuir

1. Fork do repositório
2. Crie uma branch: `git checkout -b feat/minha-mudanca`
3. Faça commits claros: `git commit -m "Descrição curta"`
4. Push e abra Pull Request

---

## Suporte

Se precisar de ajuda, cole as mensagens de erro do terminal e os logs do console do navegador (F12 → Console) e eu ajudo a diagnosticar.

---

Se quiser que eu adicione instruções para rodar o backend (API `api/games`) ou scripts Docker, me diga como você roda o backend e eu adiciono passos detalhados.

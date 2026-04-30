# ⚔️ Compêndio de Hyrule

**AV1 — Desenvolvimento de Websites (DWB) | 2º Bimestre**  
**Aluno:** Pedro Anjos  
**Turma:** 2º Ano TI A — Engenheiro Coelho  

---

## 📋 Sobre o Projeto

Aplicação web que consome a **Hyrule Compendium API** — uma API pública e gratuita com dados de criaturas, monstros, equipamentos e materiais de *The Legend of Zelda: Breath of the Wild*. O projeto exibe os monstros do jogo de forma dinâmica e responsiva, com página de listagem e página de detalhes.

API utilizada: [Hyrule Compendium API](https://github.com/gadhagod/Hyrule-Compendium-API)  
Base URL: `https://botw-compendium.herokuapp.com/api/v3`

---

## 🔗 Funcionalidades

- **Listagem de Monstros** (`index.html`): cards com imagem, nome, categoria e descrição resumida
- **Página de Detalhes** (`detalhes.html`): imagem, descrição completa, drops e locais de aparição
- **Navegação por URL**: detalhes recebem o ID via `?id=` usando `URLSearchParams`
- **Feedback de Carregamento**: spinner enquanto os dados são buscados
- **Tratamento de Erros**: mensagem amigável em caso de falha na requisição

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização personalizada |
| Bootstrap 5 | Layout responsivo |
| JavaScript (ES6+) | Lógica e DOM |
| Fetch API | Consumo da API |
| Async/Await | Requisições assíncronas |
| URLSearchParams | Passagem de parâmetros entre páginas |
| Git & GitHub | Versionamento |

---

## 📁 Estrutura do Projeto

```
av1-dwb-anjos-pedro-2bimestre/
│
├── index.html        # Listagem de monstros
├── detalhes.html     # Detalhes de um monstro
├── README.md
│
├── css/
│   └── style.css     # Estilos (tema Hyrule)
│
└── js/
    ├── script.js     # Fetch + renderização da listagem
    └── detalhes.js   # Fetch por ID + URLSearchParams
```

---

## 🚀 Como Rodar

### Localmente (VS Code + Live Server)
1. Abra a pasta no **VS Code**
2. Instale a extensão **Live Server**
3. Clique com botão direito em `index.html` → **Open with Live Server**

### Online (GitHub Pages)
Acesse: `https://zecara.github.io/av1-dwb-anjos-pedro-2bimestre/`

---

## 📖 Fluxo da Aplicação

```
index.html abre
  → script.js faz fetch na API (categoria: monsters)
  → Spinner aparece durante o carregamento
  → Cards são renderizados dinamicamente no DOM
  → Usuário clica em um card
  → Navega para detalhes.html?id=N
  → detalhes.js lê o ID via URLSearchParams
  → Faz novo fetch: /api/v3/compendium/entry/{id}
  → Renderiza imagem, descrição, drops e locais
```

---

*"It's dangerous to go alone!" — The Legend of Zelda*
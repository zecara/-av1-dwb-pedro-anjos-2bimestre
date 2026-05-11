# ⚔️ Compêndio de Hyrule

**AV1 — Desenvolvimento de Websites (DWB) | 2º Bimestre**  
**Aluno:** Pedro Anjos  
**Turma:** 2º Ano TI A — Engenheiro Coelho  

---

## 📋 Sobre o Projeto

Aplicação web que consome a **Hyrule Compendium API** — uma API pública e gratuita com dados de criaturas de *The Legend of Zelda: Breath of the Wild*. O projeto apresenta uma lista de monstros, detalhes de cada criatura e uma área de favoritos armazenada no navegador.

API utilizada: [Hyrule Compendium API](https://github.com/gadhagod/Hyrule-Compendium-API)  
Base URL: `https://botw-compendium.herokuapp.com/api/v3`

---

## 🔗 Funcionalidades

- **Listagem de Monstros** (`index.html`): cards com imagem, nome, categoria, descrição e apelidos criativos
- **Página de Detalhes** (`detalhes.html`): visualização completa do monstro com drops e locais comuns
- **Favoritos** (`favoritos.html`): salva e gerencia monstros preferidos usando `localStorage`
- **Contador de Favoritos**: mostra o total no cabeçalho em todas as páginas
- **Feedback de Carregamento**: animações de spinner durante as requisições
- **Tratamento de Erros**: mensagens amigáveis quando a API falha ou o ID é inválido

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização personalizada |
| Bootstrap 5 | Layout responsivo |
| JavaScript (ES6+) | Lógica, DOM e localStorage |
| Fetch API | Consumo da API |
| Async/Await | Requisições assíncronas |
| URLSearchParams | Passagem de parâmetros entre páginas |
| Git & GitHub | Versionamento |

---

## 📁 Estrutura do Projeto

```
-av1-dwb-pedro-anjos-2bimestre/
│
├── index.html          # Listagem de monstros
├── detalhes.html       # Detalhes individuais
├── favoritos.html      # Página de favoritos
├── README.md
├── css/
│   └── style.css       # Estilos do projeto
└── js/
    ├── script.js       # Listagem de monstros + favoritos
    ├── detalhes.js     # Detalhes do monstro por ID
    ├── favoritos.js    # Gestão de favoritos
    └── canvas-particles.js # Efeito de partículas para background
```

---

## 🚀 Como Rodar

### Localmente (VS Code + Live Server)
1. Abra a pasta no **VS Code**
2. Instale a extensão **Live Server**
3. Clique com botão direito em `index.html` → **Open with Live Server**

---

## 📖 Fluxo da Aplicação

```
index.html abre
  → script.js faz fetch na API (categoria: monsters)
  → Spinner aparece durante o carregamento
  → Cards são renderizados dinamicamente
  → Usuário clica em um card
  → Navega para detalhes.html?id=N
  → detalhes.js lê o ID via URLSearchParams
  → Faz novo fetch: /api/v3/compendium/entry/{id}
  → Renderiza imagem, descrição, drops e locais
```

---

*"It's dangerous to go alone fessor me da 10!" — The Legend of Zelda*
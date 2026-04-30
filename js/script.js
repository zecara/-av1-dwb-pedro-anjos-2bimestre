const API_URL = 'https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters';

// Seletores
const listaEl   = document.getElementById('lista-monstros');
const loadingEl = document.getElementById('loading');
const erroEl    = document.getElementById('erro');
const erroMsgEl = document.getElementById('erro-msg');
const countEl   = document.getElementById('resultado-count');

// Função principal
async function carregarMonstros() {
  mostrarLoading(true);

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    const monstros = dados.data;

    if (!monstros || monstros.length === 0) {
      throw new Error('Nenhum monstro encontrado.');
    }

    renderizarMonstros(monstros);
    countEl.textContent = `${monstros.length} criaturas encontradas`;

  } catch (erro) {
    mostrarErro(erro.message);
    console.error('Erro ao carregar monstros:', erro);
  } finally {
    mostrarLoading(false);
  }
}

// Renderiza todos os cards
function renderizarMonstros(monstros) {
  listaEl.innerHTML = '';

  monstros.forEach((monstro, index) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    col.innerHTML = criarCardHTML(monstro, index * 60);
    listaEl.appendChild(col);
  });
}

// HTML de um card
function criarCardHTML(m, delay) {
  const descricao = m.description || 'Sem descrição disponível.';
  const categoria = m.category || 'monstro';
  const imagem    = m.image    || 'https://placehold.co/200x200/0d1526/f0c040?text=?';

  return `
    <a href="detalhes.html?id=${m.id}"
       class="card-monstro"
       style="animation-delay: ${delay}ms"
       aria-label="Ver detalhes de ${m.name}">

      <div class="card-img-wrap">
        <img
          src="${imagem}"
          alt="${m.name}"
          loading="lazy"
          onerror="this.src='https://placehold.co/200x200/0d1526/f0c040?text=?'"
        />
      </div>

      <div class="card-body-hyrule">
        <p class="card-id"># ${m.id}</p>
        <h2 class="card-nome">${m.name}</h2>
        <p class="card-desc">${descricao}</p>

        <div class="card-footer-hyrule">
          <span class="card-categoria">${categoria}</span>
          <span class="card-ver-mais">Ver detalhes →</span>
        </div>
      </div>
    </a>
  `;
}

// Controla loading
function mostrarLoading(ativo) {
  loadingEl.style.display = ativo ? 'block' : 'none';
  listaEl.style.display   = ativo ? 'none'  : '';
}

// Exibe erro
function mostrarErro(mensagem) {
  erroEl.style.display  = 'block';
  listaEl.style.display = 'none';
  erroMsgEl.textContent = mensagem;
}

// Inicia
document.addEventListener('DOMContentLoaded', carregarMonstros);
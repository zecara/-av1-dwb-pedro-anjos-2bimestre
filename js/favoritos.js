// =============================================
// AV1 DWB - Pedro Anjos - 2 Bimestre
// favoritos.js — Pagina de Favoritos
// =============================================

const API_BASE = 'https://botw-compendium.herokuapp.com/api/v3/compendium/entry';
const CHAVE_LS = 'hyrule_favoritos';

const APELIDOS = {
  'lynel':              'o rapaizinho que gosta de energetico',
  'bokoblin':           'entra no meio dos inimigos sem ser atacado',
  'moblin':             'o seguranca que nao sabe segurar nada',
  'lizalfos':           'o lagarto que acha que e invisivel',
  'hinox':              'dorme no trabalho mas ainda assim e chefe',
  'guardian':           'o drone do mal com mira perfeita',
  'stal bokoblin':      'voltou do morto so pra apanhar de novo',
  'stal moblin':        'esqueleto que ainda nao aceitou que morreu',
  'chuchu':             'geleia com raiva do mundo',
  'keese':              'morcego suicida que odeia o Link',
  'electric keese':     'morcego eletrico que veio pra destruir sua vida',
  'fire keese':         'morcego que achou que virar chama era uma boa ideia',
  'wizzrobe':           'fez pos graduacao em magia e e insuportavel por isso',
  'octorok':            'cospe pedra e tem mais precisao que voce no fps',
  'black bokoblin':     'o bokoblin que malhou e ficou perigoso',
  'silver bokoblin':    'bokoblin lendario que aparece pra acabar com sua vida',
  'blue lynel':         'o lynel antes do energetico surtir',
  'white-maned lynel':  'lynel que foi pro cabeleireiro e voltou ainda mais bravo',
  'silver lynel':       'chefe final disfarado de monstro aleatorio',
};

function getApelido(nome) {
  const nomeLower = nome.toLowerCase();
  for (const chave in APELIDOS) {
    if (nomeLower.includes(chave)) return APELIDOS[chave];
  }
  return 'criatura misteriosa de Hyrule';
}

// Seletores
const listaEl      = document.getElementById('lista-favoritos');
const loadingEl    = document.getElementById('loading');
const erroEl       = document.getElementById('erro');
const erroMsgEl    = document.getElementById('erro-msg');
const vazioEl      = document.getElementById('vazio');
const countEl      = document.getElementById('resultado-count');
const btnLimparEl  = document.getElementById('btn-limpar');
const btnLimparWrap= document.getElementById('btn-limpar-wrap');
const navCountEl   = document.getElementById('nav-fav-count');

// Carrega os IDs salvos
function carregarIds() {
  const salvo = localStorage.getItem(CHAVE_LS);
  return salvo ? JSON.parse(salvo) : [];
}

// Atualiza o contador da navbar
function atualizarContadorNav() {
  const ids = carregarIds();
  if (navCountEl) {
    navCountEl.textContent = ids.length > 0 ? `(${ids.length})` : '';
  }
}

// Busca um monstro pelo ID na API
async function buscarMonstro(id) {
  const resposta = await fetch(`${API_BASE}/${id}`);
  if (!resposta.ok) throw new Error(`Erro ao buscar ID ${id}`);
  const dados = await resposta.json();
  return dados.data;
}

// Funcao principal
async function carregarFavoritos() {
  const ids = carregarIds();
  atualizarContadorNav();

  if (ids.length === 0) {
    loadingEl.style.display = 'none';
    vazioEl.style.display   = 'block';
    return;
  }

  mostrarLoading(true);

  try {
    // Busca todos os favoritos em paralelo
    const monstros = await Promise.all(ids.map(id => buscarMonstro(id)));

    renderizarFavoritos(monstros);
    countEl.textContent = `${monstros.length} favorito${monstros.length > 1 ? 's' : ''} salvo${monstros.length > 1 ? 's' : ''}`;
    btnLimparWrap.style.display = 'block';

  } catch (erro) {
    mostrarErro(erro.message);
    console.error('Erro:', erro);
  } finally {
    mostrarLoading(false);
  }
}

// Renderiza os cards
function renderizarFavoritos(monstros) {
  listaEl.innerHTML = '';
  monstros.forEach((m, index) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = criarCardHTML(m, index * 55);
    listaEl.appendChild(col);
  });
}

function criarCardHTML(m, delay) {
  const imagem    = m.image       || 'https://placehold.co/200x200/0c1a0e/d4a827?text=?';
  const descricao = m.description || 'Sem descricao disponivel.';
  const apelido   = getApelido(m.name);

  return `
    <div class="card-monstro-wrap" style="animation-delay:${delay}ms">
      <a href="detalhes.html?id=${m.id}" class="card-monstro" aria-label="Ver detalhes de ${m.name}">
        <div class="card-img-wrap">
          <img src="${imagem}" alt="${m.name}" loading="lazy"
               onerror="this.src='https://placehold.co/200x200/0c1a0e/d4a827?text=?'" />
        </div>
        <div class="card-body-hyrule">
          <p class="card-id">N ${m.id}</p>
          <h2 class="card-nome">${m.name}</h2>
          <p class="card-apelido">${apelido}</p>
          <p class="card-desc">${descricao}</p>
          <div class="card-footer-hyrule">
            <span class="card-categoria">${m.category || 'monstro'}</span>
            <span class="card-ver-mais">Ver detalhes</span>
          </div>
        </div>
      </a>
      <button class="btn-desfavoritar" onclick="removerFavorito(${m.id}, this)" title="Remover dos favoritos">
        Remover
      </button>
    </div>
  `;
}

// Remove um favorito individualmente
function removerFavorito(id, btn) {
  let ids = carregarIds();
  ids = ids.filter(i => i !== id);
  localStorage.setItem(CHAVE_LS, JSON.stringify(ids));
  atualizarContadorNav();

  // Remove o card da tela com animacao
  const card = btn.closest('.card-monstro-wrap');
  card.style.transition = 'opacity 0.3s, transform 0.3s';
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9)';
  setTimeout(() => {
    card.remove();
    const restantes = document.querySelectorAll('.card-monstro-wrap').length;
    if (restantes === 0) {
      countEl.textContent = '';
      btnLimparWrap.style.display = 'none';
      vazioEl.style.display = 'block';
    } else {
      countEl.textContent = `${restantes} favorito${restantes > 1 ? 's' : ''} salvo${restantes > 1 ? 's' : ''}`;
    }
  }, 300);
}

// Limpa todos os favoritos
btnLimparEl.addEventListener('click', function () {
  if (confirm('Remover todos os favoritos?')) {
    localStorage.removeItem(CHAVE_LS);
    listaEl.innerHTML = '';
    countEl.textContent = '';
    btnLimparWrap.style.display = 'none';
    vazioEl.style.display = 'block';
    atualizarContadorNav();
  }
});

function mostrarLoading(ativo) {
  loadingEl.style.display = ativo ? 'block' : 'none';
  listaEl.style.display   = ativo ? 'none'  : '';
}

function mostrarErro(mensagem) {
  erroEl.style.display  = 'block';
  listaEl.style.display = 'none';
  erroMsgEl.textContent = mensagem;
}

document.addEventListener('DOMContentLoaded', carregarFavoritos);
// =============================================
// AV1 DWB - Pedro Anjos - 2 Bimestre
// script.js — Listagem de Monstros + Favoritos
// =============================================

const API_URL  = 'https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters';
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
  'stal lizalfos':      'lagarto morto que teima em lutar',
  'chuchu':             'geleia com raiva do mundo',
  'keese':              'morcego suicida que odeia o Link',
  'electric keese':     'morcego eletrico que veio pra destruir sua vida',
  'fire keese':         'morcego que achou que virar chama era uma boa ideia',
  'ice keese':          'morcego frozen que nem Elsa pediu',
  'wizzrobe':           'fez pos graduacao em magia e e insuportavel por isso',
  'octorok':            'cospe pedra e tem mais precisao que voce no fps',
  'octoballo':          'balao voador com sede de sangue',
  'black bokoblin':     'o bokoblin que malhou e ficou perigoso',
  'silver bokoblin':    'bokoblin lendario que aparece pra acabar com sua vida',
  'blue bokoblin':      'bokoblin que tomou energetico e ficou mais forte',
  'black moblin':       'moblin que foi pro regime e voltou raivoso',
  'black lizalfos':     'lagarto elite que vai te fazer se arrepender',
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

// --- Favoritos via localStorage ---

function getFavoritos() {
  const salvo = localStorage.getItem(CHAVE_LS);
  return salvo ? JSON.parse(salvo) : [];
}

function isFavorito(id) {
  return getFavoritos().includes(id);
}

function toggleFavorito(id) {
  let ids = getFavoritos();
  if (ids.includes(id)) {
    ids = ids.filter(i => i !== id);
  } else {
    ids.push(id);
  }
  localStorage.setItem(CHAVE_LS, JSON.stringify(ids));
  atualizarContadorNav();
  return ids.includes(id);
}

function atualizarContadorNav() {
  const navCount = document.getElementById('nav-fav-count');
  if (!navCount) return;
  const total = getFavoritos().length;
  navCount.textContent = total > 0 ? `(${total})` : '';
}

// --- Seletores ---
const listaEl   = document.getElementById('lista-monstros');
const loadingEl = document.getElementById('loading');
const erroEl    = document.getElementById('erro');
const erroMsgEl = document.getElementById('erro-msg');
const countEl   = document.getElementById('resultado-count');

// --- Carrega monstros ---
async function carregarMonstros() {
  mostrarLoading(true);
  atualizarContadorNav();

  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error(`Erro na requisicao: ${resposta.status}`);

    const dados = await resposta.json();
    const monstros = dados.data;
    if (!monstros || monstros.length === 0) throw new Error('Nenhum monstro encontrado.');

    renderizarMonstros(monstros);
    countEl.textContent = `${monstros.length} criaturas catalogadas`;

  } catch (erro) {
    mostrarErro(erro.message);
    console.error('Erro:', erro);
  } finally {
    mostrarLoading(false);
  }
}

// --- Renderiza cards ---
function renderizarMonstros(monstros) {
  listaEl.innerHTML = '';
  monstros.forEach((monstro, index) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = criarCardHTML(monstro, index * 55);
    listaEl.appendChild(col);
  });
}

function criarCardHTML(m, delay) {
  const descricao  = m.description || 'Sem descricao disponivel.';
  const categoria  = m.category    || 'monstro';
  const imagem     = m.image       || 'https://placehold.co/200x200/0c1a0e/d4a827?text=?';
  const apelido    = getApelido(m.name);
  const favAtivo   = isFavorito(m.id) ? 'fav-ativo' : '';

  return `
    <div class="card-wrapper" style="animation: fadeUp 0.4s ease ${delay}ms both; height:100%;">
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
            <span class="card-categoria">${categoria}</span>
            <span class="card-ver-mais">Ver detalhes</span>
          </div>
        </div>
      </a>
      <button
        class="btn-favoritar ${favAtivo}"
        data-id="${m.id}"
        title="${isFavorito(m.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
        onclick="handleFavoritar(event, ${m.id}, this)">
        ${isFavorito(m.id) ? '★' : '☆'}
      </button>
    </div>
  `;
}

// Clique no botao de favoritar
function handleFavoritar(event, id, btn) {
  event.preventDefault();
  event.stopPropagation();

  const agora = toggleFavorito(id);
  btn.textContent = agora ? '★' : '☆';
  btn.title = agora ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
  btn.classList.toggle('fav-ativo', agora);

  // Animacao de feedback
  btn.style.transform = 'scale(1.4)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

function mostrarLoading(ativo) {
  loadingEl.style.display = ativo ? 'block' : 'none';
  listaEl.style.display   = ativo ? 'none'  : '';
}

function mostrarErro(mensagem) {
  erroEl.style.display  = 'block';
  listaEl.style.display = 'none';
  erroMsgEl.textContent = mensagem;
}

document.addEventListener('DOMContentLoaded', carregarMonstros);
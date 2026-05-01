

const API_URL = 'https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters';

// Apelidos personalizados para os monstros
const APELIDOS = {
  'lynel':              'o rapaizinho que gosta de energetico',
  'bokoblin':           'o fodao que entrano meio dos inimigos sem ser atacado',
  'moblin':             'o seguranca que nao sabe segurar nada',
  'lizalfos':           'o lagarto que acha que e invisivel',
  'hinox':              'dorme no trabalho mas ainda assim e chefe',
  'guardian':           'o drone do mal com mira perfeita',
  'stal bokoblin':      'voltou do morto so pra apanhar de novo',
  'stal moblin':        'esqueleto que ainda nao aceitou que morreu',
  'stal lizalfos':      'lagarto morto que teima em lutar',
  'chuchu':             'geleia com raiva do mundo(nosso caso, de voce)',
  'keese':              'morcego suicida que odeia o Link',
  'electric keese':     'morcego eletrico que veio pra destruir sua vida',
  'fire keese':         'morcego que achou que virar chama era uma boa ideia',
  'ice keese':          'morcego frozen que nem Elsa pediu',
  'wizzrobe':           'fez pos graduacao em magia e e insuportavel por isso',
  'lizal tri-boomerang':'o cara que manda boomerang e ainda ri da sua cara',
  'octorok':            'cospe pedra e tem mais precisao que voce no fps',
  'octoballo':          'balao voador com sede de sangue',
  'electric wizzrobe':  'mago eletrico que vai te surpreender do pior jeito',
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

// Seletores
const listaEl   = document.getElementById('lista-monstros');
const loadingEl = document.getElementById('loading');
const erroEl    = document.getElementById('erro');
const erroMsgEl = document.getElementById('erro-msg');
const countEl   = document.getElementById('resultado-count');

async function carregarMonstros() {
  mostrarLoading(true);
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
  const descricao = m.description || 'Sem descricao disponivel.';
  const categoria = m.category    || 'monstro';
  const imagem    = m.image       || 'https://placehold.co/200x200/0c1a0e/d4a827?text=?';
  const apelido   = getApelido(m.name);

  return `
    <a href="detalhes.html?id=${m.id}"
       class="card-monstro"
       style="animation-delay:${delay}ms"
       aria-label="Ver detalhes de ${m.name}">
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
  `;
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
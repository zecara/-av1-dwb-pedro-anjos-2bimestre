// =============================================
// AV1 DWB - Pedro Anjos - 2 Bimestre
// detalhes.js — Detalhes do Monstro
// =============================================

const API_BASE = 'https://botw-compendium.herokuapp.com/api/v3/compendium/entry';

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

// Seletores
const loadingEl  = document.getElementById('loading');
const erroEl     = document.getElementById('erro');
const erroMsgEl  = document.getElementById('erro-msg');
const conteudoEl = document.getElementById('detalhe-conteudo');

function obterIdDaURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  if (isNaN(id) || id <= 0) throw new Error('ID invalido ou nao informado na URL.');
  return id;
}

async function carregarDetalhes() {
  mostrarLoading(true);
  try {
    const id = obterIdDaURL();
    const resposta = await fetch(`${API_BASE}/${id}`);
    if (!resposta.ok) throw new Error(`Erro na requisicao: ${resposta.status}`);

    const dados = await resposta.json();
    const monstro = dados.data;
    if (!monstro) throw new Error('Criatura nao encontrada.');

    renderizarDetalhes(monstro);
    document.title = `${monstro.name} — Compendio de Hyrule`;

  } catch (erro) {
    mostrarErro(erro.message);
    console.error('Erro:', erro);
  } finally {
    mostrarLoading(false);
  }
}

function renderizarDetalhes(m) {
  const imagem    = m.image       || 'https://placehold.co/300x300/0c1a0e/d4a827?text=?';
  const descricao = m.description || 'Sem descricao disponivel.';
  const categoria = m.category    || 'monstro';
  const apelido   = getApelido(m.name);

  const dropsHTML = (m.drops && m.drops.length > 0)
    ? m.drops.map(d => `<span class="badge-drop">${d}</span>`).join('')
    : '<span style="color:var(--muted);font-style:italic;">Nenhum drop conhecido</span>';

  const locaisHTML = (m.common_locations && m.common_locations.length > 0)
    ? m.common_locations.map(l => `<span class="badge-local">${l}</span>`).join('')
    : '<span style="color:var(--muted);font-style:italic;">Locais desconhecidos</span>';

  conteudoEl.innerHTML = `
    <div class="detalhe-card">
      <div class="row g-0">
        <div class="col-md-4 detalhe-img-col">
          <img src="${imagem}" alt="${m.name}"
               onerror="this.src='https://placehold.co/300x300/0c1a0e/d4a827?text=?'" />
        </div>
        <div class="col-md-8 detalhe-body">
          <p class="detalhe-id">Entrada N ${m.id}</p>
          <h1 class="detalhe-nome">${m.name}</h1>
          <p class="detalhe-apelido">${apelido}</p>
          <span class="detalhe-categoria">${categoria}</span>

          <p class="detalhe-section-title" style="margin-top:20px;">Descricao</p>
          <p class="detalhe-descricao">${descricao}</p>

          <div class="detalhe-info-grid mb-0">
            <div>
              <p class="detalhe-section-title">Locais Comuns</p>
              <div>${locaisHTML}</div>
            </div>
            <div>
              <p class="detalhe-section-title">Drops</p>
              <div>${dropsHTML}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  conteudoEl.style.display = 'block';
}

function mostrarLoading(ativo) {
  loadingEl.style.display  = ativo ? 'block' : 'none';
  conteudoEl.style.display = ativo ? 'none'  : 'block';
}

function mostrarErro(mensagem) {
  erroEl.style.display     = 'block';
  conteudoEl.style.display = 'none';
  erroMsgEl.textContent    = mensagem;
}

document.addEventListener('DOMContentLoaded', carregarDetalhes);
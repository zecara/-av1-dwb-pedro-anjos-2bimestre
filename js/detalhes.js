// =============================================
// AV1 DWB - Pedro Anjos - 2º Bimestre
// detalhes.js — Detalhes do Monstro
// API: Hyrule Compendium (Breath of the Wild)
// =============================================

const API_BASE = 'https://botw-compendium.herokuapp.com/api/v3/compendium/entry';

// Seletores
const loadingEl   = document.getElementById('loading');
const erroEl      = document.getElementById('erro');
const erroMsgEl   = document.getElementById('erro-msg');
const conteudoEl  = document.getElementById('detalhe-conteudo');

// Lê o ID da URL (ex: detalhes.html?id=123)
function obterIdDaURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (isNaN(id) || id <= 0) {
    throw new Error('ID inválido ou não informado na URL.');
  }

  return id;
}

// Função principal
async function carregarDetalhes() {
  mostrarLoading(true);

  try {
    const id = obterIdDaURL();

    const resposta = await fetch(`${API_BASE}/${id}`);

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    const monstro = dados.data;

    if (!monstro) {
      throw new Error('Criatura não encontrada.');
    }

    renderizarDetalhes(monstro);
    document.title = `${monstro.name} — Compêndio de Hyrule`;

  } catch (erro) {
    mostrarErro(erro.message);
    console.error('Erro ao carregar detalhes:', erro);
  } finally {
    mostrarLoading(false);
  }
}

// Renderiza a página de detalhes
function renderizarDetalhes(m) {
  const imagem    = m.image       || 'https://placehold.co/300x300/0d1526/f0c040?text=?';
  const descricao = m.description || 'Sem descrição disponível.';
  const categoria = m.category    || 'monstro';

  // Drops (itens que o monstro larga ao morrer)
  const dropsHTML = (m.drops && m.drops.length > 0)
    ? m.drops.map(d => `<span class="badge-drop">${d}</span>`).join('')
    : '<span style="color:var(--muted); font-style:italic;">Nenhum drop conhecido</span>';

  // Locais onde o monstro aparece
  const locaisHTML = (m.common_locations && m.common_locations.length > 0)
    ? m.common_locations.map(l => `<span class="badge-local">${l}</span>`).join('')
    : '<span style="color:var(--muted); font-style:italic;">Locais desconhecidos</span>';

  conteudoEl.innerHTML = `
    <div class="detalhe-card">
      <div class="row g-0">

        <!-- Imagem -->
        <div class="col-md-4 detalhe-img-col">
          <img
            src="${imagem}"
            alt="${m.name}"
            onerror="this.src='https://placehold.co/300x300/0d1526/f0c040?text=?'"
          />
        </div>

        <!-- Informações -->
        <div class="col-md-8 detalhe-body">

          <p class="detalhe-id">Entrada # ${m.id}</p>
          <h1 class="detalhe-nome">${m.name}</h1>
          <span class="detalhe-categoria">${categoria}</span>

          <!-- Descrição -->
          <p class="detalhe-section-title">Descrição</p>
          <p class="detalhe-descricao">${descricao}</p>

          <!-- Localização e drops lado a lado -->
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

// Controla loading
function mostrarLoading(ativo) {
  loadingEl.style.display  = ativo ? 'block' : 'none';
  conteudoEl.style.display = ativo ? 'none'  : 'block';
}

// Exibe erro
function mostrarErro(mensagem) {
  erroEl.style.display     = 'block';
  conteudoEl.style.display = 'none';
  erroMsgEl.textContent    = mensagem;
}

// Inicia
document.addEventListener('DOMContentLoaded', carregarDetalhes);

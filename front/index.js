const API_URL = "https://achados-perdidos-liye.onrender.com";
const PRODUTOS_POR_PAGINA = 16;

let todosObjetos = [];
let paginaAtual = 1;

async function carregarObjetos() {
  try {
    const response = await fetch(`${API_URL}/Objetos`);
    if (!response.ok) throw new Error("Erro ao buscar objetos");

    todosObjetos = await response.json();
    
    // Mostrar paginação apenas se tiver mais de 16 produtos
    const paginationContainer = document.getElementById("pagination-container");
    if (todosObjetos.length > PRODUTOS_POR_PAGINA) {
      paginationContainer.style.display = "flex";
      gerarBotoesPaginacao();
    } else {
      paginationContainer.style.display = "none";
    }
    
    exibirPagina(1);

  } catch (error) {
    console.error("Erro ao carregar objetos:", error);
  }
}

function exibirPagina(numeroPagina) {
  paginaAtual = numeroPagina;
  
  const inicio = (numeroPagina - 1) * PRODUTOS_POR_PAGINA;
  const fim = inicio + PRODUTOS_POR_PAGINA;
  const objetosPagina = todosObjetos.slice(inicio, fim);

  const grid = document.querySelector(".items-grid");
  grid.innerHTML = "";

  objetosPagina.forEach(obj => {
    const card = document.createElement("article");
    card.className = "item-card";

    card.innerHTML = `
      <div class="card-img">
        <img src="images/exemplo-item.png" alt="${obj.nome}">
      </div>
      <div class="card-info">
        <h3>${obj.nome}</h3>
        <p class="desc">
          Descrição:<br>${obj.descricao || "Sem descrição"}
        </p>
        <button class="btn-card"
          onclick="window.location.href='produto.html?id=${obj.id}'">
          INFORMAÇÕES
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  atualizarBotoesPaginacao();
}

function gerarBotoesPaginacao() {
  const totalPaginas = Math.ceil(todosObjetos.length / PRODUTOS_POR_PAGINA);
  const paginationButtons = document.getElementById("pagination-buttons");
  paginationButtons.innerHTML = "";

  // Determinar quais páginas mostrar
  let paginasVisíveis = [];
  
  if (totalPaginas <= 5) {
    // Mostrar todas as páginas
    paginasVisíveis = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  } else {
    // Mostrar primeira, última e as 3 ao redor da página atual
    paginasVisíveis = [1];
    
    const inicio = Math.max(2, paginaAtual - 1);
    const fim = Math.min(totalPaginas - 1, paginaAtual + 1);
    
    if (inicio > 2) {
      paginasVisíveis.push("...");
    }
    
    for (let i = inicio; i <= fim; i++) {
      paginasVisíveis.push(i);
    }
    
    if (fim < totalPaginas - 1) {
      paginasVisíveis.push("...");
    }
    
    paginasVisíveis.push(totalPaginas);
  }

  // Criar botões
  paginasVisíveis.forEach(pagina => {
    if (pagina === "...") {
      const span = document.createElement("span");
      span.className = "dots";
      span.textContent = "...";
      paginationButtons.appendChild(span);
    } else {
      const button = document.createElement("button");
      button.className = "page-btn";
      if (pagina === paginaAtual) {
        button.classList.add("active");
      }
      button.textContent = pagina;
      button.onclick = () => exibirPagina(pagina);
      paginationButtons.appendChild(button);
    }
  });
}

function atualizarBotoesPaginacao() {
  const totalPaginas = Math.ceil(todosObjetos.length / PRODUTOS_POR_PAGINA);
  
  // Atualizar botões de seta
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  prevBtn.disabled = paginaAtual === 1;
  nextBtn.disabled = paginaAtual === totalPaginas;
  
  // Atualizar classe active nos botões de página
  document.querySelectorAll(".page-btn:not(.arrow)").forEach(btn => {
    btn.classList.remove("active");
    if (parseInt(btn.textContent) === paginaAtual) {
      btn.classList.add("active");
    }
  });
}

function mudarPagina(direcao) {
  const totalPaginas = Math.ceil(todosObjetos.length / PRODUTOS_POR_PAGINA);
  let novaPagina = paginaAtual + direcao;
  
  if (novaPagina < 1) novaPagina = 1;
  if (novaPagina > totalPaginas) novaPagina = totalPaginas;
  
  exibirPagina(novaPagina);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", carregarObjetos);

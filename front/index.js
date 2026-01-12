// URL do backend (Render)
const API_URL = "https://achados-perdidos-liye.onrender.com/";

/**
 * Carrega objetos do backend e renderiza na tela
 */
async function carregarObjetos() {
  try {
    const response = await fetch(`${API_URL}/Objetos`);
    const objetos = await response.json();

    const grid = document.querySelector(".items-grid");
    grid.innerHTML = ""; // remove card de exemplo

    objetos.forEach(obj => {
      const card = document.createElement("article");
      card.className = "item-card";

      card.innerHTML = `
        <div class="card-img">
          <img src="${obj.imagem_url || "images/exemplo-item.png"}" alt="${obj.nome}">
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

  } catch (error) {
    console.error("Erro ao carregar objetos:", error);
  }
}

// Executa quando a página carregar
document.addEventListener("DOMContentLoaded", carregarObjetos);

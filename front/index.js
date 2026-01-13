const API_URL = "https://achados-perdidos-liye.onrender.com";

async function carregarObjetos() {
  try {
    const response = await fetch(`${API_URL}/Objetos`);
    if (!response.ok) throw new Error("Erro ao buscar objetos");

    const objetos = await response.json();
    const grid = document.querySelector(".items-grid");

    if (!grid) return;

    grid.innerHTML = "";

    objetos.forEach(obj => {
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

  } catch (error) {
    console.error("Erro ao carregar objetos:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarObjetos);

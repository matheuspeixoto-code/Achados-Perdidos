const API_URL = "https://achados-perdidos-liye.onrender.com";

async function carregarObjetosRecuperados() {
  try {
    const response = await fetch(`${API_URL}/Objetos/?status=RECUPERADO`);

    if (!response.ok) {
      // Se a API não suporta filtro por status, carrega todos e filtra
      const allResponse = await fetch(`${API_URL}/Objetos/`);
      const allObjetos = await allResponse.json();
      const recuperados = allObjetos.filter(
        (obj) => obj.status === "RECUPERADO" || obj.status === "DEVOLVIDO"
      );
      exibirObjetos(recuperados);
      return;
    }

    const objetos = await response.json();
    exibirObjetos(objetos);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar objetos recuperados");
  }
}

function exibirObjetos(objetos) {
  const container = document.getElementById("objetos-container");
  
  if (objetos.length === 0) {
    container.innerHTML = "<p>Nenhum objeto recuperado</p>";
    return;
  }

  container.innerHTML = objetos
    .map(
      (obj) => `
    <div class="objeto-card">
      <h3>${obj.nome}</h3>
      <p>${obj.descricao}</p>
      <p>Status: <strong>${obj.status}</strong></p>
      <p>Local encontrado: ${obj.local}</p>
      <button onclick="window.location.href='produto.html?id=${obj.id}'">Ver detalhes</button>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", carregarObjetosRecuperados);

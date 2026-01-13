const API_URL = "https://achados-perdidos-liye.onrender.com";

function verificarAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token || !user.isAdmin) {
    window.location.href = "auth.html";
    return false;
  }
  return true;
}

async function carregarObjetos() {
  if (!verificarAdmin()) return;

  try {
    const response = await fetch(`${API_URL}/Objetos/`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Erro ao carregar objetos");

    const objetos = await response.json();
    exibirObjetos(objetos);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar objetos");
  }
}

function exibirObjetos(objetos) {
  const container = document.getElementById("objetos-container");
  
  if (objetos.length === 0) {
    container.innerHTML = "<p>Nenhum objeto cadastrado</p>";
    return;
  }

  container.innerHTML = objetos
    .map(
      (obj) => `
    <div class="objeto-card">
      <h3>${obj.nome}</h3>
      <p>${obj.descricao}</p>
      <p>Local: ${obj.local}</p>
      <p>Data: ${obj.dataEncontrada}</p>
      <div class="acoes">
        <button onclick="editarObjeto('${obj.id}')">Editar</button>
        <button onclick="deletarObjeto('${obj.id}')">Deletar</button>
      </div>
    </div>
  `
    )
    .join("");
}

function editarObjeto(id) {
  window.location.href = `editar-item.html?id=${id}`;
}

async function deletarObjeto(id) {
  if (!confirm("Tem certeza que deseja deletar?")) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Objetos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      alert("Objeto deletado!");
      carregarObjetos();
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao deletar objeto");
  }
}

document.addEventListener("DOMContentLoaded", carregarObjetos);

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

async function carregarObjeto() {
  if (!verificarAdmin()) return;

  const params = new URLSearchParams(window.location.search);
  const objetoId = params.get("id");

  if (!objetoId) {
    alert("Nenhum objeto especificado");
    window.location.href = "admin-posts.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/Objetos/${objetoId}`);
    if (!response.ok) throw new Error("Objeto não encontrado");

    const objeto = await response.json();
    preencherFormulario(objeto);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar objeto");
  }
}

function preencherFormulario(objeto) {
  document.getElementById("nome").value = objeto.nome;
  document.getElementById("descricao").value = objeto.descricao;
  document.getElementById("local").value = objeto.local;
  document.getElementById("dataEncontrada").value = objeto.dataEncontrada;
  document.getElementById("hora").value = objeto.hora;
  document.getElementById("objeto-id").value = objeto.id;
}

async function salvarObjeto(e) {
  e.preventDefault();

  const form = document.getElementById("editar-form");
  const formData = new FormData(form);
  const objetoId = document.getElementById("objeto-id").value;

  const data = {
    nome: formData.get("nome"),
    descricao: formData.get("descricao"),
    local: formData.get("local"),
    dataEncontrada: formData.get("dataEncontrada"),
    hora: formData.get("hora"),
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Objetos/${objetoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Objeto atualizado com sucesso!");
      window.location.href = "admin-posts.html";
    } else {
      alert("Erro ao atualizar objeto");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao atualizar objeto");
  }
}

document.addEventListener("DOMContentLoaded", carregarObjeto);

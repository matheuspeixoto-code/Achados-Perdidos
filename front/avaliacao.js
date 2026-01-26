const API_URL = "https://achados-perdidos-liye.onrender.com";

function verificarLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "auth.html";
    return false;
  }
  return true;
}

async function carregarObjeto() {
  if (!verificarLogin()) return;

  const params = new URLSearchParams(window.location.search);
  const objetoId = params.get("id");

  if (!objetoId) {
    alert("Nenhum objeto especificado");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/Objetos/${objetoId}`);
    if (!response.ok) throw new Error("Objeto não encontrado");

    const objeto = await response.json();
    exibirObjeto(objeto);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar objeto");
  }
}

function exibirObjeto(objeto) {
  document.getElementById("objeto-nome").textContent = objeto.nome;
  document.getElementById("objeto-descricao").textContent = objeto.descricao;
  document.getElementById("objeto-local").textContent = objeto.local;
  document.getElementById("objeto-data").textContent = objeto.dataEncontrada;
}

async function enviarAvaliacao() {
  const form = document.getElementById("avaliacao-form");
  const formData = new FormData(form);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Avaliacoes/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      alert("Avaliação enviada com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Erro ao enviar avaliação");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar avaliação");
  }
}

document.addEventListener("DOMContentLoaded", carregarObjeto);

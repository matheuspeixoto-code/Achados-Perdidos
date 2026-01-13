const API_URL = "https://achados-perdidos-liye.onrender.com";

function verificarLogin() {
  const token = localStorage.getItem("token");
  return token !== null;
}

async function carregarObjeto() {
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
  document.getElementById("objeto-local").textContent = `Local: ${objeto.local}`;
  document.getElementById("objeto-data").textContent = `Data: ${objeto.dataEncontrada}`;
  document.getElementById("objeto-hora").textContent = `Hora: ${objeto.hora}`;
  document.getElementById("objeto-id").value = objeto.id;
}

async function solicitarObjeto() {
  if (!verificarLogin()) {
    window.location.href = "auth.html";
    return;
  }

  const justificativa = document.getElementById("justificativa").value;
  const objetoId = document.getElementById("objeto-id").value;

  if (!justificativa) {
    alert("Por favor, preencha a justificativa");
    return;
  }

  const formData = new FormData();
  formData.append("justificativa", justificativa);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Solicitacoes/${objetoId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      alert("Solicitação enviada com sucesso!");
      window.location.href = "pessoais.html";
    } else {
      alert("Erro ao enviar solicitação");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar solicitação");
  }
}

document.addEventListener("DOMContentLoaded", carregarObjeto);

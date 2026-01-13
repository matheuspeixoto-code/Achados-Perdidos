const API_URL = "https://achados-perdidos-liye.onrender.com";

function verificarLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "auth.html";
    return false;
  }
  return true;
}

function carregarDados() {
  if (!verificarLogin()) return;

  // Recuperar dados da avaliação do sessionStorage
  const avaliacao = JSON.parse(sessionStorage.getItem("avaliacao"));
  
  if (avaliacao) {
    document.getElementById("avaliacao-resumo").innerHTML = `
      <p>Objeto: ${avaliacao.objeto_nome}</p>
      <p>Avaliação: ${avaliacao.estrelas} estrelas</p>
      <p>Comentário: ${avaliacao.comentario}</p>
    `;
  }
}

async function confirmarAvaliacao() {
  try {
    const token = localStorage.getItem("token");
    const avaliacao = JSON.parse(sessionStorage.getItem("avaliacao"));

    const response = await fetch(`${API_URL}/Avaliacoes/confirmar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(avaliacao),
    });

    if (response.ok) {
      alert("Avaliação confirmada!");
      sessionStorage.removeItem("avaliacao");
      window.location.href = "index.html";
    } else {
      alert("Erro ao confirmar avaliação");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao confirmar avaliação");
  }
}

function cancelarAvaliacao() {
  sessionStorage.removeItem("avaliacao");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", carregarDados);

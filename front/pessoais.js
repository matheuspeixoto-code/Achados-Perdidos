const API_URL = "https://achados-perdidos-liye.onrender.com";

function verificarLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "auth.html";
    return false;
  }
  return true;
}

async function carregarMinhasSolicitacoes() {
  if (!verificarLogin()) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Solicitacoes/minhasSolicitacoes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao carregar solicitações");

    const solicitacoes = await response.json();
    exibirSolicitacoes(solicitacoes);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar suas solicitações");
  }
}

function exibirSolicitacoes(solicitacoes) {
  const container = document.getElementById("solicitacoes-container");
  
  if (solicitacoes.length === 0) {
    container.innerHTML = "<p>Você não fez nenhuma solicitação ainda</p>";
    return;
  }

  container.innerHTML = solicitacoes
    .map(
      (sol) => `
    <div class="solicitacao-card">
      <p>Objeto ID: ${sol.objeto_id}</p>
      <p>Status: <strong>${sol.status}</strong></p>
      <p>Data: ${new Date(sol.created_at).toLocaleDateString()}</p>
      <p>${sol.justificativa}</p>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", carregarMinhasSolicitacoes);

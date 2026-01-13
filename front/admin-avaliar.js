const API_URL = "https://achados-perdidos-liye.onrender.com";

// Verificar se usuário está logado e é admin
function verificarAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token || !user.isAdmin) {
    window.location.href = "auth.html";
    return false;
  }
  return true;
}

// Carregar solicitações pendentes
async function carregarSolicitacoes() {
  if (!verificarAdmin()) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Solicitacoes/pendentes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao carregar solicitações");

    const solicitacoes = await response.json();
    exibirSolicitacoes(solicitacoes);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar solicitações");
  }
}

function exibirSolicitacoes(solicitacoes) {
  const container = document.getElementById("solicitacoes-container");
  
  if (solicitacoes.length === 0) {
    container.innerHTML = "<p>Nenhuma solicitação pendente</p>";
    return;
  }

  container.innerHTML = solicitacoes
    .map(
      (sol) => `
    <div class="solicitacao-card">
      <h3>${sol.objeto_id}</h3>
      <p>${sol.descricao}</p>
      <div class="acoes">
        <button onclick="aceitarSolicitacao('${sol.id}')">Aceitar</button>
        <button onclick="rejeitarSolicitacao('${sol.id}')">Rejeitar</button>
      </div>
    </div>
  `
    )
    .join("");
}

async function aceitarSolicitacao(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Solicitacoes/aceitar/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      alert("Solicitação aceita!");
      carregarSolicitacoes();
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao aceitar solicitação");
  }
}

async function rejeitarSolicitacao(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/Solicitacoes/rejeitar/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      alert("Solicitação rejeitada!");
      carregarSolicitacoes();
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao rejeitar solicitação");
  }
}

// Carregar ao iniciar página
document.addEventListener("DOMContentLoaded", carregarSolicitacoes);

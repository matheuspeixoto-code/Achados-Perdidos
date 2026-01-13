const API_URL = "https://achados-perdidos-liye.onrender.com";

function verificarLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "auth.html";
    return false;
  }
  return true;
}

async function carregarPerfil() {
  if (!verificarLogin()) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/User/myUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao carregar perfil");

    const user = await response.json();
    exibirPerfil(user);
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao carregar perfil");
  }
}

function exibirPerfil(user) {
  document.getElementById("user-nome").textContent = user.nome_completo;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-cpf").textContent = user.cpf;
  document.getElementById("user-telefone").textContent = user.telefone;
  document.getElementById("user-avatar").src = user.avatar || "images/default-avatar.png";
}

async function atualizarAvatar(e) {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/User/avatar`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      alert("Avatar atualizado!");
      carregarPerfil();
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao atualizar avatar");
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "auth.html";
}

document.addEventListener("DOMContentLoaded", carregarPerfil);

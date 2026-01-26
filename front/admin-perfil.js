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

function exibirPerfil() {
  if (!verificarAdmin()) return;

  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("admin-nome").textContent = user.nome_completo;
  document.getElementById("admin-email").textContent = user.email;
  document.getElementById("admin-avatar").src = user.avatar || "images/default-avatar.png";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "auth.html";
}

document.addEventListener("DOMContentLoaded", exibirPerfil);

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
  // Preencher título com nome completo
  const titleElement = document.querySelector(".profile-identity h1");
  if (titleElement) {
    titleElement.textContent = user.nome || "Usuário";
  }

  // Carregar avatar
  const imgElement = document.getElementById("img-preview");
  if (imgElement && user.avatar) {
    imgElement.src = user.avatar;
  }

  // Preencher formulário com dados do usuário
  const usuarioInput = document.querySelector("input[name='usuario']");
  if (usuarioInput) {
    usuarioInput.value = user.nome || "";
  }

  const telefoneInput = document.querySelector("input[name='telefone']");
  if (telefoneInput) {
    telefoneInput.value = user.telefone || "";
  }

  const emailInput = document.querySelector("input[name='email']");
  if (emailInput) {
    emailInput.value = user.email || "";
  }

  const cidadeInput = document.querySelector("input[name='cidade']");
  if (cidadeInput && user.endereco) {
    cidadeInput.value = user.endereco.cidade || "";
  }

  const estadoInput = document.querySelector("input[name='estado']");
  if (estadoInput && user.endereco) {
    estadoInput.value = user.endereco.estado || "";
  }

  const sexoInput = document.querySelector("input[name='sexo']");
  if (sexoInput && user.sexo) {
    sexoInput.value = user.sexo;
  }
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

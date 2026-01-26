const API_URL = "https://achados-perdidos-liye.onrender.com";

const form = document.getElementById("form-cadastrar-item");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

// Proteção da página
if (!token || !user || user.isAdmin !== true) {
  alert("Acesso restrito ao administrador");
  window.location.href = "index.html";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    local: document.getElementById("local").value,
    dataEncontrada: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    categoria_id: null
  };

  try {
    const response = await fetch(`${API_URL}/Objetos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar item");
    }

    alert("Item cadastrado com sucesso!");
    window.location.href = "admin-posts.html";

  } catch (error) {
    console.error(error);
    alert(error.message || "Erro ao cadastrar item");
  }
});

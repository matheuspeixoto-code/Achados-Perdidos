const API_URL = "https://achados-perdidos-liye.onrender.com";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("user").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (!username || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/secao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Usuário ou senha inválidos");
      }

      const data = await response.json();


      if (!data.token || !data.user) {
        throw new Error("Resposta inválida do servidor");
      }

      // salva sessão
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redireciona conforme o tipo de usuário
      if (data.user.isAdmin) {
        window.location.href = "admin-perfil.html";
      } else {
        window.location.href = "index.html";
      }

    } catch (error) {
      alert(error.message || "Erro ao realizar login");
      console.error(error);
    }
  });
}

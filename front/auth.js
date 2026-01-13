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
      /* ===============================
        LOGIN → OBTÉM TOKEN
      =============================== */
      const loginResponse = await fetch(`${API_URL}/secao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, senha }),
      });

      if (!loginResponse.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const { token } = await loginResponse.json();

      if (!token) {
        throw new Error("Token não recebido");
      }

      localStorage.setItem("token", token);

      /* ===============================
        BUSCA DADOS DO USUÁRIO
      =============================== */
      const userResponse = await fetch(`${API_URL}/User/myUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }

      const user = await userResponse.json();

      localStorage.setItem("user", JSON.stringify(user));

      /* ===============================
        REDIRECIONAMENTO
      =============================== */
      if (user.isAdmin) {
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

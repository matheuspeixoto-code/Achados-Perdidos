const API_URL = "https://achados-perdidos-liye.onrender.com";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("user").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const submitButton = loginForm.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Entrando...";

    try {
      console.log("Tentando login com email:", email);
      
      // Login → token
      const loginResponse = await fetch(`${API_URL}/secao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      console.log("Response status:", loginResponse.status);

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => ({}));
        console.error("Erro na resposta:", errorData);
        throw new Error(
          errorData.message || "Usuário ou senha inválidos"
        );
      }

      const { token } = await loginResponse.json();
      localStorage.setItem("token", token);
      console.log("Token recebido");

      // Dados do usuário
      const userResponse = await fetch(`${API_URL}/User/myUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!userResponse.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      const user = await userResponse.json();
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Usuário:", user);

      // Redirecionamento
      window.location.href = user.isAdmin
        ? "admin-perfil.html"
        : "index.html";

    } catch (error) {
      console.error("Erro de login:", error);
      alert(error.message || "Erro ao realizar login");
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

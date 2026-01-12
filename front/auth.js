const API_URL = "https://achados-perdidos-liye.onrender.com";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("user").value;
    const senha = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          senha
        })
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const data = await response.json();

      //salva sessão
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
    }
  });
}

// Página de ajuda/suporte
console.log("Página Ajuda carregada");

function enviarMensagem(e) {
  e.preventDefault();
  const form = document.getElementById("ajuda-form");
  const formData = new FormData(form);

  // Aqui você pode enviar para um endpoint de suporte
  console.log("Mensagem de ajuda:", {
    nome: formData.get("nome"),
    email: formData.get("email"),
    mensagem: formData.get("mensagem"),
  });

  alert("Mensagem enviada! Entraremos em contato em breve.");
  form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página Ajuda inicializada");
});

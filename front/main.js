/* =======================================================
   1. FUNÇÕES DO AUTH (LOGIN E CADASTRO)
   ======================================================= */
function toggleAuthScreen() {
    const loginScreen = document.getElementById('login-container');
    const registerScreen = document.getElementById('register-container');
    
    if (!loginScreen || !registerScreen) return; 

    if (!loginScreen.classList.contains('hidden')) {
        loginScreen.classList.add('hidden');
        registerScreen.classList.remove('hidden');
    } else {
        loginScreen.classList.remove('hidden');
        registerScreen.classList.add('hidden');
    }
}

function nextStep(stepNumber) {
    const currentStepNum = stepNumber - 1;
    const currentStepDiv = document.getElementById(`step-${currentStepNum}`);

    if (currentStepDiv) {
        const inputs = currentStepDiv.querySelectorAll('input, select');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
        }
    }

    hideAllSteps();
    const nextStepDiv = document.getElementById(`step-${stepNumber}`);
    if (nextStepDiv) nextStepDiv.classList.remove('hidden');
}

function prevStep(stepNumber) {
    hideAllSteps();
    const prevStepDiv = document.getElementById(`step-${stepNumber}`);
    if (prevStepDiv) prevStepDiv.classList.remove('hidden');
}

function hideAllSteps() {
    const steps = document.querySelectorAll('.register-step');
    steps.forEach(step => step.classList.add('hidden'));
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "auth.html";
}


function controlarPermissoes() {
  const user = JSON.parse(localStorage.getItem("user"));

  const adminElements = document.querySelectorAll(".admin-only");
  const userElements = document.querySelectorAll(".user-only");

  if (!user) {
    adminElements.forEach(el => el.classList.add("hidden"));
    userElements.forEach(el => el.classList.add("hidden"));
    return;
  }

  if (user.isAdmin === true) {
    adminElements.forEach(el => el.classList.remove("hidden"));
    userElements.forEach(el => el.classList.add("hidden"));
  } else {
    adminElements.forEach(el => el.classList.add("hidden"));
    userElements.forEach(el => el.classList.remove("hidden"));
  }
}

document.addEventListener("DOMContentLoaded", controlarPermissoes);


/* =======================================================
   2. FUNÇÕES DE MENUS (DROPDOWNS E FILTROS)
   ======================================================= */
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    document.getElementById('dropdown-profile')?.classList.add('hidden');
    menu?.classList.toggle('hidden');
}

function toggleProfile() {
    const profile = document.getElementById('dropdown-profile');
    document.getElementById('dropdown-menu')?.classList.add('hidden');
    profile?.classList.toggle('hidden');
}

window.onclick = function(event) {
    if (!event.target.closest('.menu-container')) {
        document.getElementById('dropdown-menu')?.classList.add('hidden');
    }
    if (!event.target.closest('.profile-container') && !event.target.closest('.user-profile')) {
        document.getElementById('dropdown-profile')?.classList.add('hidden');
    }
}

/* =======================================================
   3. SIMULAÇÃO DE ENVIO (CADASTRO)
   ======================================================= */
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
        console.log("=== DADOS DO CADASTRO ===", Object.fromEntries(formData.entries()));
        alert("Cadastro simulado! Veja os dados no Console (F12).");
        window.location.href = 'index.html'; 
    });
}

/* =======================================================
   4. FUNÇÃO DE EDITAR PERFIL / DADOS PESSOAIS
   ======================================================= */
let isEditing = false;

function habilitarEdicao() {
    const inputs = document.querySelectorAll('.input-dado');
    const btn = document.getElementById('btn-editar');

    if (!isEditing) {
        inputs.forEach(input => input.removeAttribute('readonly'));
        btn.innerText = "Salvar Alterações";
        btn.style.color = "var(--accent-red)";
        btn.style.borderBottom = "2px solid var(--accent-red)";
        isEditing = true;
    } else {
        inputs.forEach(input => input.setAttribute('readonly', true));
        if(window.location.href.includes('pessoais.html')){
             btn.innerText = "Editar Dados";
        } else {
             btn.innerText = "Editar Perfil";
        }
        btn.style.color = "var(--navy-blue)";
        btn.style.borderBottom = "2px solid transparent";
        isEditing = false;
        alert("Dados enviados para atualização no Banco de Dados!");
    }
}

/* =======================================================
   5. PREVIEW DE IMAGEM (PERFIL)
   ======================================================= */
function previewImagem(event) {
    const input = event.target;
    const preview = document.getElementById('img-preview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/* =======================================================
   6. FUNÇÕES DA PÁGINA DE PRODUTO (RECLAMAR ITEM)
   ======================================================= */
function mostrarNomeArquivo() {
    const input = document.getElementById('upload-prova');
    const display = document.getElementById('file-name');
    
    if (input && input.files.length > 0) {
        display.textContent = input.files[0].name;
        display.style.color = "var(--navy-blue)";
        display.style.fontWeight = "bold";
    }
}

function enviarReclamacao(event) {
    event.preventDefault(); 
    alert("Sua solicitação de resgate foi enviada com sucesso!\nAcompanhe o status em 'Itens em Avaliação'.");
    window.location.href = 'avaliacao.html';
}

/* =======================================================
   7. PAGINAÇÃO E BUSCA (AJUDA)
   ======================================================= */
const itemsPerPage = 5; 
let currentPage = 1;

function initPagination() {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return; 

    const items = faqList.getElementsByClassName('faq-item');
    const totalPages = Math.ceil(items.length / itemsPerPage);

    renderPage(currentPage, items);
    renderPaginationControls(totalPages);
}

function renderPage(page, items) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    for (let i = 0; i < items.length; i++) {
        if (i >= start && i < end) {
            items[i].style.display = ""; 
        } else {
            items[i].style.display = "none"; 
        }
    }
}

function renderPaginationControls(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    paginationContainer.innerHTML = ""; 

    const prevBtn = document.createElement("button");
    prevBtn.className = "page-btn arrow";
    prevBtn.innerHTML = '<span class="material-icons">chevron_left</span>';
    prevBtn.onclick = () => changePage(currentPage - 1, totalPages);
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => changePage(i, totalPages);
        paginationContainer.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "page-btn arrow";
    nextBtn.innerHTML = '<span class="material-icons">chevron_right</span>';
    nextBtn.onclick = () => changePage(currentPage + 1, totalPages);
    paginationContainer.appendChild(nextBtn);
}

function changePage(newPage, totalPages) {
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;
    const items = document.querySelectorAll('.faq-item');
    renderPage(currentPage, items);
    renderPaginationControls(totalPages);
    document.querySelector('.help-search-container')?.scrollIntoView({ behavior: 'smooth' });
}

function filtrarAjuda() {
    const input = document.getElementById('help-search');
    const filter = input.value.toLowerCase();
    const items = document.querySelectorAll('.faq-item');
    const paginationContainer = document.getElementById('pagination');

    if (!paginationContainer) return;

    if (filter === "") {
        paginationContainer.style.display = "flex";
        renderPage(currentPage, items);
        return;
    }

    paginationContainer.style.display = "none";
    items.forEach(item => {
        const h3 = item.querySelector("h3");
        const txtValue = h3.textContent || h3.innerText;
        item.style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
    });
}

document.addEventListener("DOMContentLoaded", initPagination);

/* =======================================================
   9. PROTEÇÃO DE ROTAS (AUTENTICAÇÃO + ADMIN)
   ======================================================= */

function protegerRotas() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const paginaAtual = window.location.pathname.split("/").pop();

  /* =============================
     ROTAS ADMIN
  ============================= */
  const paginasAdmin = [
    "admin-perfil.html",
    "admin-posts.html",
    "admin-avaliar.html",
    "cadastrar-item.html",
    "editar-item.html",
    "confirmar-avaliacao.html"
  ];

  /* =============================
     ROTAS QUE EXIGEM LOGIN
  ============================= */
  const paginasProtegidas = [
    "index.html",
    "perfil.html",
    "pessoais.html",
    "avaliacao.html",
    "minhas-solicitacoes.html",
    "recuperados.html",
    "produto.html"
  ];

  /* =============================
     BLOQUEIO SEM LOGIN
  ============================= */
  if (
    (paginasProtegidas.includes(paginaAtual) ||
     paginasAdmin.includes(paginaAtual)) &&
    (!token || !user)
  ) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "auth.html";
    return;
  }

  /* =============================
     BLOQUEIO ADMIN
  ============================= */
  if (paginasAdmin.includes(paginaAtual) && user?.isAdmin !== true) {
    alert("Acesso restrito ao administrador.");
    window.location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  protegerRotas();
  controlarPermissoes();
});
# 🔍 Achados e Perdidos UFC

Um sistema web completo para gerenciar itens perdidos e encontrados no Campus Russas da Universidade Federal do Ceará (UFC).

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node-18.x-green)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-15-lightblue)

## 📋 Sumário

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológico](#-stack-tecnológico)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Deploy](#-deploy)
- [Contribuir](#-contribuir)

## 🎯 Sobre

O **Achados e Perdidos UFC** é uma plataforma que facilita o encontro de itens perdidos e encontrados no campus. Usuários podem:

- Consultar itens encontrados
- Requerer a devolução de itens encontrados
- Solicitar itens para administradores avaliar

Administradores podem:

- Cadastrar novos itens encontrados
- Avaliar solicitações de resgate
- Gerenciar usuários e itens do sistema

## ✨ Funcionalidades

### Para Usuários Regulares
- ✅ Cadastro e login na plataforma
- ✅ Visualizar itens encontrados
- ✅ Solicitar resgate de itens
- ✅ Visualizar histórico de solicitações
- ✅ Gerenciar perfil e avatar
- ✅ Buscar itens por categoria
- ✅ Paginação inteligente (16 itens por página)

### Para Administradores
- ✅ Cadastrar novos itens encontrados
- ✅ Editar dados de itens
- ✅ Deletar itens do sistema
- ✅ Avaliar solicitações (aceitar/rejeitar)
- ✅ Visualizar todos os itens do sistema
- ✅ Gerenciar categorias de itens

### Segurança
- ✅ Autenticação via JWT
- ✅ Hash de senhas com bcrypt
- ✅ Proteção de rotas baseada em permissões
- ✅ Soft delete para usuários (não deleta permanentemente)

## 🚀 Stack Tecnológico

### Backend
- **Node.js 18** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **PostgreSQL 15** - Banco de dados
- **TypeORM** - ORM para TypeScript
- **JWT** - Autenticação com tokens
- **Bcrypt** - Hash de senhas
- **Multer** - Upload de arquivos

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Styling responsivo
- **JavaScript Vanilla** - Interatividade (sem frameworks)
- **Fetch API** - Requisições HTTP
- **LocalStorage** - Persistência de dados

### Infraestrutura
- **Docker** - Containerização
- **Render** - Deploy em produção
- **PostgreSQL com Docker** - Ambiente local

## 📦 Pré-requisitos

- Node.js 18 ou superior
- Docker e Docker Compose (para ambiente local)
- Git
- Um navegador web moderno

## 🔧 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/matheuspeixoto-code/Achados-Perdidos.git
cd Achados-Perdidos
```

### 2. Instalar dependências do Backend

```bash
cd back
npm install
cd ..
```

### 3. Instalar dependências do Frontend

O frontend não requer instalação (usa arquivos estáticos).

### 4. Configurar Docker (Local)

```bash
docker-compose -f back/docker-compose.yml up -d
```

Isso iniciará um container PostgreSQL na porta 5433.

## ⚙️ Configuração

### Backend

#### 1. Criar arquivo `.env`

```bash
cp back/.env.example back/.env
```

#### 2. Configurar variáveis (arquivo: `back/.env`)

```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/achados-perdidos
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=achados-perdidos
JWT_SECRET=achados_perdidos_jwt_secret_key_2026_super_seguro_123456789
PORT=3333
```

#### 3. Executar migrations

```bash
cd back
npm run typeorm migration:run -- -d dist/data-source.js
```

#### 4. Criar usuário admin (opcional)

```bash
npm run seed:admin
```

Credenciais padrão:
- Email: `admin@achados-perdidos.com`
- Senha: `admin`

#### 5. Criar usuário de teste (opcional)

```bash
npm run seed:usuario-teste
```

Credenciais:
- Email: `usuario@teste.com`
- Senha: `senha123`

#### 6. Criar itens de exemplo (opcional)

```bash
npm run seed:exemplos
```

### Frontend

A configuração do frontend é feita automaticamente via arquivos JavaScript. A URL da API é definida em cada arquivo `.js`:

```javascript
const API_URL = "https://achados-perdidos-liye.onrender.com";
```

Para desenvolvimento local, altere para:

```javascript
const API_URL = "http://localhost:3333";
```

## 💻 Como Usar

### Iniciar o Backend

```bash
cd back
npm run dev
```

O servidor iniciará em `http://localhost:3333`

### Abrir o Frontend

Navegue até a pasta `front` e abra `index.html` em um navegador, ou use um servidor local:

```bash
cd front
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Login

#### Primeiro acesso como admin:
- Email: `admin@achados-perdidos.com`
- Senha: `admin`

#### Primeiro acesso como usuário regular:
- Email: `usuario@teste.com`
- Senha: `senha123`

## 📁 Estrutura do Projeto

```
Achados-Perdidos/
├── back/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── objetos/              # Lógica de itens
│   │   │   ├── solicitacoes/         # Lógica de solicitações
│   │   │   └── users/                # Lógica de usuários
│   │   ├── shared/
│   │   │   ├── container/            # Injeção de dependências
│   │   │   └── infra/
│   │   │       ├── database/         # Migrations e seeding
│   │   │       ├── errors/           # Tratamento de erros
│   │   │       └── http/             # Server e middlewares
│   │   └── config/                   # Configurações
│   ├── docker-compose.yml            # Config Docker local
│   ├── Dockerfile                    # Build para produção
│   ├── package.json                  # Dependências
│   └── tsconfig.json                 # Config TypeScript
│
└── front/
    ├── index.html                    # Página inicial
    ├── auth.html                     # Login e cadastro
    ├── perfil.html                   # Perfil do usuário
    ├── produto.html                  # Detalhes do item
    ├── *.js                          # Lógica de cada página
    ├── css/                          # Estilos
    └── images/                       # Imagens estáticas
```

## 🔌 API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/secao` | Login do usuário |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/User/createUser` | Criar novo usuário |
| GET | `/User/myUser` | Obter dados do usuário logado |
| GET | `/User/:id` | Obter dados de um usuário |
| PUT | `/User/update` | Atualizar dados do usuário |
| DELETE | `/User/delete` | Deletar conta do usuário |
| PATCH | `/User/avatar` | Fazer upload de avatar |

### Objetos (Itens)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/Objetos` | Listar todos os itens |
| GET | `/Objetos/:id` | Obter detalhes de um item |
| POST | `/Objetos` | Criar novo item (admin) |
| PUT | `/Objetos/:id` | Atualizar item (admin) |
| DELETE | `/Objetos/:id` | Deletar item (admin) |
| POST | `/Objetos/images/:id` | Upload de imagem do item |

### Solicitações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/Solicitacoes/:objeto_id` | Solicitar um item |
| GET | `/Solicitacoes/pendentes` | Listar solicitações pendentes (admin) |
| GET | `/Solicitacoes/minhasSolicitacoes` | Listar minhas solicitações |
| PATCH | `/Solicitacoes/aceitar/:id` | Aceitar solicitação (admin) |
| PATCH | `/Solicitacoes/rejeitar/:id` | Rejeitar solicitação (admin) |

### Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/Categoria` | Listar categorias |
| POST | `/Categoria` | Criar categoria (admin) |

## 📝 Scripts Disponíveis

### Backend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Database
npm run typeorm              # CLI do TypeORM
npm run typeorm:create       # Criar comando customizado

# Seeders (Dados de exemplo)
npm run seed:admin           # Criar usuário admin
npm run seed:usuario-teste   # Criar usuário de teste
npm run seed:exemplos        # Criar 6 itens de exemplo
npm run seed:imagens         # Linkar imagens aos itens
npm run seed:update-admin-password  # Resetar senha do admin
```

## 🔐 Variáveis de Ambiente

### Backend (`.env`)

```env
# Servidor
NODE_ENV=production                    # production ou development
PORT=3333                              # Porta do servidor

# Database
DATABASE_URL=postgresql://...          # URL de conexão PostgreSQL
POSTGRES_USER=postgres                 # Usuário do PostgreSQL
POSTGRES_PASSWORD=postgres             # Senha do PostgreSQL
POSTGRES_DB=achados-perdidos          # Nome do banco

# Autenticação
JWT_SECRET=sua_chave_secreta_aqui     # Chave para assinar JWT
```

### Frontend

Configurado diretamente nos arquivos `.js`:

```javascript
const API_URL = "https://achados-perdidos-liye.onrender.com";
```

## 🚀 Deploy

### Deploy em Render

#### 1. Conectar repositório
1. Acesse [render.com](https://render.com)
2. Clique em "New +"
3. Selecione "Web Service"
4. Conecte seu repositório GitHub

#### 2. Configurar build
- **Build Command**: `cd back && npm install && npm run build`
- **Start Command**: `cd back && npm start`

#### 3. Configurar variáveis de ambiente
No dashboard do Render, adicione em "Environment":

```
NODE_ENV=production
DATABASE_URL=postgresql://...  # URL do banco em produção
JWT_SECRET=seu_valor_aqui
PORT=3333
```

#### 4. Deploy
Clique em "Deploy" e aguarde o build e deployment completarem.

## 📸 Screenshots

### Login
![Login Page](front/images/auth-preview.png)

### Página Inicial
![Home Page](front/images/index-preview.png)

### Detalhes do Item
![Product Page](front/images/produto-preview.png)

## 🤝 Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Roadmap

- [ ] Notificações por email
- [ ] Integração com redes sociais
- [ ] Busca avançada de itens
- [ ] Mapa de localização dos itens
- [ ] Chat entre usuários
- [ ] Histórico de atividades
- [ ] Relatórios de administrador

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

**Matheus Peixoto**
- GitHub: [@matheuspeixoto-code](https://github.com/matheuspeixoto-code)

## 🆘 Suporte

Para reportar bugs ou solicitar features, abra uma [issue](https://github.com/matheuspeixoto-code/Achados-Perdidos/issues) no GitHub.

## 📚 Referências

- [Express.js Documentation](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

---

**Desenvolvido com ❤️ para a UFC Campus Russas**

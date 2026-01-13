# 📚 Documentação da API

Referência completa de todos os endpoints da API do Achados e Perdidos UFC.

**URL Base:** `https://achados-perdidos-liye.onrender.com`

## 🔐 Autenticação

Todos os endpoints protegidos requerem um token JWT no header:

```http
Authorization: Bearer seu_token_jwt_aqui
```

## 📋 Índice

1. [Autenticação](#-autenticação)
2. [Usuários](#-usuários)
3. [Objetos (Itens)](#-objetos-itens)
4. [Solicitações](#-solicitações)
5. [Categorias](#-categorias)
6. [Códigos de Erro](#-códigos-de-erro)

---

## 🔐 Autenticação

### Login

Fazer login na plataforma e obter token JWT.

**Request:**
```http
POST /secao
Content-Type: application/json

{
  "email": "usuario@teste.com",
  "senha": "senha123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome_completo": "Usuário Teste",
    "email": "usuario@teste.com",
    "avatar": null
  }
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Email ou senha incorreta"
}
```

---

## 👥 Usuários

### Criar Novo Usuário

Registrar um novo usuário na plataforma.

**Request:**
```http
POST /User/createUser
Content-Type: application/json

{
  "nome_completo": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senha123",
  "telefone": "(88) 9 9999-9999",
  "cpf": "12345678910",
  "genero": "masculino",
  "data_nascimento": "2000-05-15",
  "cep": "61700000",
  "rua": "Rua das Flores",
  "numero": "123",
  "bairro": "Centro",
  "cidade": "Russas",
  "estado": "CE"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome_completo": "João Silva",
  "email": "joao@exemplo.com",
  "telefone": "(88) 9 9999-9999"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "CPF já cadastrado" | "Email já cadastrado"
}
```

### Obter Meus Dados

Obter informações do usuário autenticado.

**Request:**
```http
GET /User/myUser
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome_completo": "Usuário Teste",
  "email": "usuario@teste.com",
  "telefone": "(88) 9 8888-8888",
  "cpf": "12345678910",
  "genero": "masculino",
  "data_nascimento": "2000-05-15",
  "avatar": null,
  "isAdmin": false,
  "endereco": {
    "cep": "61700000",
    "rua": "Rua Teste",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "Russas",
    "estado": "CE"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid token"
}
```

### Obter Dados de um Usuário

Obter informações de um usuário específico (público).

**Request:**
```http
GET /User/:id
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome_completo": "Usuário Teste",
  "email": "usuario@teste.com",
  "avatar": null
}
```

**Response (404 Not Found):**
```json
{
  "message": "Usuário não encontrado"
}
```

### Atualizar Dados do Usuário

Atualizar informações do usuário autenticado.

**Request:**
```http
PUT /User/update
Authorization: Bearer seu_token_jwt_aqui
Content-Type: application/json

{
  "nome_completo": "Novo Nome",
  "telefone": "(88) 9 1111-1111",
  "genero": "feminino"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome_completo": "Novo Nome",
  "email": "usuario@teste.com",
  "telefone": "(88) 9 1111-1111"
}
```

### Upload de Avatar

Fazer upload da foto de perfil do usuário.

**Request:**
```http
PATCH /User/avatar
Authorization: Bearer seu_token_jwt_aqui
Content-Type: multipart/form-data

[binary image data]
```

**Response (200 OK):**
```json
{
  "message": "Avatar atualizado com sucesso",
  "avatar_url": "https://..."
}
```

### Deletar Conta

Deletar a conta do usuário (soft delete).

**Request:**
```http
DELETE /User/delete
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

## 📦 Objetos (Itens)

### Listar Todos os Itens

Obter lista de todos os itens encontrados.

**Request:**
```http
GET /Objetos
```

**Query Parameters:**
- `status` (opcional): ENCONTRADO, DISPONIVEL, REIVINDICADO, DEVOLVIDO, DESCARTADO
- `categoria_id` (opcional): Filtrar por categoria
- `page` (opcional): Página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 16)

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Garrafa Térmica Preta",
    "descricao": "Garrafa térmica com logo Experiências",
    "local": "Campus da UFC",
    "dataEncontrada": "2026-01-10",
    "hora": "14:30:00",
    "status": "ENCONTRADO",
    "categoria_id": "550e8400-e29b-41d4-a716-446655440001",
    "imagens": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "objeto_image": "garrafa-termica.jpg"
      }
    ]
  }
]
```

### Obter Detalhes de um Item

Obter informações completas de um item específico.

**Request:**
```http
GET /Objetos/:id
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Garrafa Térmica Preta",
  "descricao": "Garrafa térmica com logo Experiências",
  "local": "Campus da UFC",
  "dataEncontrada": "2026-01-10",
  "hora": "14:30:00",
  "status": "ENCONTRADO",
  "categoria": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "nome": "Acessórios"
  },
  "imagens": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "objeto_image": "garrafa-termica.jpg"
    }
  ],
  "created_at": "2026-01-10T14:30:00Z"
}
```

**Response (404 Not Found):**
```json
{
  "message": "Item não encontrado"
}
```

### Criar Novo Item

Cadastrar um novo item encontrado (apenas admin).

**Request:**
```http
POST /Objetos
Authorization: Bearer seu_token_jwt_aqui
Content-Type: application/json

{
  "nome": "Chave de Carro",
  "descricao": "Chave preta com logo Honda",
  "local": "Estacionamento Setor A",
  "dataEncontrada": "2026-01-13",
  "hora": "10:00:00",
  "categoria_id": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "nome": "Chave de Carro",
  "descricao": "Chave preta com logo Honda",
  "local": "Estacionamento Setor A",
  "dataEncontrada": "2026-01-13",
  "status": "ENCONTRADO"
}
```

**Response (403 Forbidden):**
```json
{
  "message": "Apenas administradores podem criar itens"
}
```

### Atualizar Item

Atualizar informações de um item (apenas admin).

**Request:**
```http
PUT /Objetos/:id
Authorization: Bearer seu_token_jwt_aqui
Content-Type: application/json

{
  "nome": "Chave de Carro Honda",
  "status": "DEVOLVIDO"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "nome": "Chave de Carro Honda",
  "status": "DEVOLVIDO"
}
```

### Deletar Item

Deletar um item do sistema (apenas admin).

**Request:**
```http
DELETE /Objetos/:id
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
{
  "message": "Item deletado com sucesso"
}
```

### Upload de Imagem do Item

Fazer upload de imagem para um item.

**Request:**
```http
POST /Objetos/images/:id
Authorization: Bearer seu_token_jwt_aqui
Content-Type: multipart/form-data

[binary image data]
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440004",
  "objeto_id": "550e8400-e29b-41d4-a716-446655440003",
  "objeto_image": "chave-carro.jpg",
  "created_at": "2026-01-13T10:00:00Z"
}
```

---

## 📝 Solicitações

### Solicitar um Item

Solicitar a devolução de um item encontrado.

**Request:**
```http
POST /Solicitacoes/:objeto_id
Authorization: Bearer seu_token_jwt_aqui
Content-Type: multipart/form-data

justificativa=Essa é minha chave, tem o logo da minha casa
[optional: upload_prova (file)]
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440005",
  "objeto_id": "550e8400-e29b-41d4-a716-446655440003",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "justificativa": "Essa é minha chave...",
  "status": "PENDENTE",
  "created_at": "2026-01-13T10:00:00Z"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Item não encontrado" | "Justificativa obrigatória"
}
```

### Listar Solicitações Pendentes

Listar todas as solicitações aguardando avaliação (apenas admin).

**Request:**
```http
GET /Solicitacoes/pendentes
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440005",
    "objeto": {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "nome": "Chave de Carro"
    },
    "usuario": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nome_completo": "Usuário Teste"
    },
    "justificativa": "Essa é minha chave...",
    "status": "PENDENTE",
    "created_at": "2026-01-13T10:00:00Z"
  }
]
```

### Minhas Solicitações

Listar as solicitações do usuário autenticado.

**Request:**
```http
GET /Solicitacoes/minhasSolicitacoes
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440005",
    "objeto": {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "nome": "Chave de Carro"
    },
    "justificativa": "Essa é minha chave...",
    "status": "PENDENTE",
    "created_at": "2026-01-13T10:00:00Z"
  }
]
```

### Aceitar Solicitação

Aprovar uma solicitação de resgate (apenas admin).

**Request:**
```http
PATCH /Solicitacoes/aceitar/:id
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440005",
  "status": "ACEITA",
  "updated_at": "2026-01-13T11:00:00Z"
}
```

### Rejeitar Solicitação

Rejeitar uma solicitação de resgate (apenas admin).

**Request:**
```http
PATCH /Solicitacoes/rejeitar/:id
Authorization: Bearer seu_token_jwt_aqui
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440005",
  "status": "REJEITADA",
  "updated_at": "2026-01-13T11:00:00Z"
}
```

---

## 📂 Categorias

### Listar Categorias

Obter lista de todas as categorias.

**Request:**
```http
GET /Categoria
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "nome": "Acessórios"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "nome": "Eletrônicos"
  }
]
```

### Criar Categoria

Criar uma nova categoria (apenas admin).

**Request:**
```http
POST /Categoria
Authorization: Bearer seu_token_jwt_aqui
Content-Type: application/json

{
  "nome": "Documentos"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "nome": "Documentos"
}
```

---

## ⚠️ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Requisição inválida |
| 401 | Unauthorized - Token inválido ou expirado |
| 403 | Forbidden - Sem permissão para acessar |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

### Formato de Erro

```json
{
  "message": "Descrição do erro",
  "status": 400
}
```

---

## 📌 Notas Importantes

1. **Autenticação**: A maioria dos endpoints requer autenticação via JWT
2. **Admin**: Alguns endpoints só funcionam para usuários com `isAdmin: true`
3. **CORS**: A API está configurada para aceitar requisições do frontend
4. **Rate Limiting**: Sem limite de requisições (a ser implementado)
5. **Versionamento**: Atualmente na v1 (sem prefixo /api/v1/)

---

## 🔗 Links Úteis

- [Documentação de Deploy](./README.md)
- [Guia de Contribuição](./CONTRIBUTING.md)
- [Issues](https://github.com/matheuspeixoto-code/Achados-Perdidos/issues)
- [Discussões](https://github.com/matheuspeixoto-code/Achados-Perdidos/discussions)

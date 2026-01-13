import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "@data";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

async function seedUsuarioTeste() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    console.log("Criando usuário de teste...");

    const usuarioEmail = "usuario@teste.com";
    const existingUser = await AppDataSource.query(
      'SELECT id FROM users WHERE email = $1',
      [usuarioEmail]
    );

    if (existingUser.length === 0) {
      const userId = uuidV4();
      const enderecoId = uuidV4();
      const password = await hash("senha123", 8);

      await AppDataSource.query(
        `INSERT INTO users (
          id, cpf, telefone, username, nome_completo, email, senha, 
          genero, data_nascimento, "isAdmin", created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now())`,
        [
          userId,
          "12345678910",
          "(88) 9 8888-8888",
          "usuario_teste",
          "Usuário Teste",
          usuarioEmail,
          password,
          "masculino",
          "2000-05-15",
          false,
        ]
      );

      await AppDataSource.query(
        `INSERT INTO enderecos (id, user_id, cep, rua, numero, bairro, cidade, estado, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())`,
        [
          enderecoId,
          userId,
          "61700000",
          "Rua Teste",
          "123",
          "Centro",
          "Russas",
          "CE",
        ]
      );

      console.log("✅ Usuário de teste criado com sucesso!");
      console.log("📧 Email: usuario@teste.com");
      console.log("🔑 Senha: senha123");
      console.log("👤 Nome: Usuário Teste");
      console.log("⚙️  Admin: false");
    } else {
      console.log("⏭️  Usuário de teste já existe no banco de dados");
    }
  } catch (error) {
    console.error("❌ Erro ao criar usuário de teste:", error);
  }

  await AppDataSource.destroy();
}

seedUsuarioTeste();

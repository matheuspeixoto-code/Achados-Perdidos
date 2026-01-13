import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../../../data-source";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

AppDataSource.initialize()
  .then(async () => {
    console.log("Banco conectado");

    await AppDataSource.runMigrations();
    console.log("Migrations executadas");

    // Criar usuário admin
    try {
      const adminEmail = "admin@achados-perdidos.com";
      const existingAdmin = await AppDataSource.query(
        'SELECT id FROM users WHERE email = $1',
        [adminEmail]
      );

      if (existingAdmin.length === 0) {
        console.log("Criando usuário admin...");
        
        const userId = uuidV4();
        const enderecoId = uuidV4();
        const password = await hash("admin", 8);

        await AppDataSource.query(
          `INSERT INTO users (
            id, cpf, telefone, username, nome_completo, email, senha, 
            genero, data_nascimento, "isAdmin", created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now())`,
          [
            userId,
            "11144477735",
            "11999999999",
            "admin",
            "Admin",
            adminEmail,
            password,
            "masculino",
            "2002-08-15",
            true,
          ]
        );

        await AppDataSource.query(
          `INSERT INTO enderecos (id, user_id, cep, rua, numero, bairro, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, now())`,
          [enderecoId, userId, "01001000", "Praça da Sé", "100", "Sé"]
        );

        console.log("✅ Usuário admin criado com sucesso!");
        console.log("📧 Email: admin@achados-perdidos.com");
        console.log("🔑 Senha: admin");
      } else {
        console.log("✅ Usuário admin já existe no banco de dados");
      }
    } catch (error) {
      console.error("Erro ao criar admin:", error);
    }

    await AppDataSource.destroy();
    process.exit(0);
  })
  .catch(err => {
    console.error("Erro ao rodar migrations", err);
    process.exit(1);
  });

import { AppDataSource } from "@data";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import "dotenv/config";

async function create() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD não definida");
  }

  const userId = uuidV4();
  const enderecoId = uuidV4();
  const password = await hash(process.env.ADMIN_PASSWORD, 8);


  await AppDataSource.query(
    `
    INSERT INTO users (
      id,
      cpf,
      telefone,
      username,
      nome_completo,
      email,
      senha,
      genero,
      data_nascimento,
      "isAdmin",
      created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now()
    )
    `,
    [
      userId,
      process.env.ADMIN_CPF,
      process.env.ADMIN_CONTATO,
      "Administrador",
      process.env.ADMIN_NAME,
      process.env.ADMIN_EMAIL,
      password,
      "masculino",
      "2002-08-15",
      true,
    ]
  );

 
  await AppDataSource.query(
    `
    INSERT INTO enderecos (
      id,
      user_id,
      cep,
      rua,
      numero,
      bairro,
      created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, now()
    )
    `,
    [
      enderecoId,
      userId,
      "01001000",
      "Praça da Sé",
      "100",
      "Sé",
    ]
  );

  await AppDataSource.destroy();
}

create().then(() => console.log("User admin created!"));

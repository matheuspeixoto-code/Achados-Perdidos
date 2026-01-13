import { AppDataSource } from "@data";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import "dotenv/config";

async function create() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const userId = uuidV4();
  const enderecoId = uuidV4();
  const password = await hash("admin", 8);


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
      "11144477735",
      "11999999999",
      "admin",
      "Admin",
      "admin@achados-perdidos.com",
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

import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "@data";
import { hash } from "bcrypt";

async function updateAdminPassword() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    const password = await hash("admin", 8);

    const result = await AppDataSource.query(
      `UPDATE users SET senha = $1 WHERE email = $2`,
      [password, "admin@achados-perdidos.com"]
    );

    console.log("Senha do admin atualizada com sucesso!");
    console.log("Email: admin@achados-perdidos.com");
    console.log("Senha: admin");
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
  }

  await AppDataSource.destroy();
}

updateAdminPassword();

import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../../../data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Banco conectado");

    await AppDataSource.runMigrations();
    console.log("Migrations executadas");

    await AppDataSource.destroy();
    process.exit(0);
  })
  .catch(err => {
    console.error("Erro ao rodar migrations", err);
    process.exit(1);
  });

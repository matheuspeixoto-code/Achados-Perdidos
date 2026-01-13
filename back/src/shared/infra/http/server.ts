import "dotenv/config";
import validateEnv from "./validateEnv";
import { app } from "./app";
import { AppDataSource } from "@data";

validateEnv();

const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco:", error);
  });

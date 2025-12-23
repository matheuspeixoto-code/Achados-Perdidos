import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/shared/infra/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
});

import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,

  ssl: process.env.NODE_ENV === "production",

  entities: ["dist/modules/**/entities/*.js"],
  migrations: ["dist/shared/infra/database/migrations/*.js"],

  synchronize: false,
  logging: false,
});

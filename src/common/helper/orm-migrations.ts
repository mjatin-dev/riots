

import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "postgres",
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

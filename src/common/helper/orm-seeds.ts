import { DataSource, DataSourceOptions } from "typeorm";

import "dotenv/config";
import { Players } from "../../entity/players.entity";
import { Ranks } from "../../entity/ranks.entity";


const devPGOptions = {
  host: process.env.DB_HOST || "postgres",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
};

const prodPGOptions = { url: process.env.DATABASE_URL };

let options: any = {
  type: "postgres", // IF you are using a different type of connector, please mention here explicitly.
  database: process.env.DATABASE_NAME || "riot",
  entities: [
  Players,
  Ranks
  ],
  migrations: ["src/migrations/*.ts"],
  seeds: ["src/seeders/*.ts"],
};

if (process.env.NODE_ENV !== "production") {
  options = { ...options, ...devPGOptions };
} else {
  options = { ...options, ...prodPGOptions };
}

const dataSource = new DataSource(options);
// npm run typeorm:generate --name=UserAndUserRoles  Migration Script
export default dataSource;

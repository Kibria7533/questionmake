import * as path from "path";
import { config } from "dotenv";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// Load environment variables
config();

const sourcePath = path.join(__dirname, "../");

const DatabaseConfig: MysqlConnectionOptions = {
  type: process.env.DB_TYPE as "mysql", // TypeORM expects a literal type
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [sourcePath + "/database/entities/**/*{.ts,.js}"],
  extra: {
    seeds: [sourcePath + "/database/seeds/**/*{.ts,.js}"],
  },
  synchronize: true,
  timezone: process.env.DB_TIMEZONE || "UTC",
  logging: process.env.DB_LOGGING === "true", // Optional logging from .env
};

export default DatabaseConfig;

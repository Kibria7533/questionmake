import * as path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

const sourcePath = path.join(__dirname, "../");
console.log(sourcePath);
const DatabaseConfig: TypeOrmModuleOptions = {
  type: "mongodb",
  host: "127.0.0.1",
  // port: Number.parseInt(ENV.DB_PORT),
  port: 27017,
  ssl: false,
  authMechanism: "DEFAULT",
  authSource: "admin",
  username: "admin",
  password: "admin",
  database: "test",
  // useUnifiedTopology: true,

  entities: [sourcePath + "/database/entities/**/*{.ts,.js}"],
  // extra: {
  //   seeds: [sourcePath + "/database/seeds/**/*{.ts,.js}"],
  //   factories: [sourcePath + "/database/factories/**/*{.ts,.js}"],
  // },
  // migrationsTableName: "migrations",
  synchronize: true,
  // timezone: "UTC+06",
  logging: true,
  // migrations: [sourcePath + "database/migrations/**/*{.ts,.js}"],
};
export default DatabaseConfig;

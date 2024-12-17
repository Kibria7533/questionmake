import * as path from "path";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const sourcePath = path.join(__dirname, "../");
console.log(sourcePath);
const DatabaseConfig: MysqlConnectionOptions = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "questionmake",
  entities: [sourcePath + "/database/entities/**/*{.ts,.js}"],
  extra: {
    seeds: [sourcePath + "/database/seeds/**/*{.ts,.js}"],
    //   factories: [sourcePath + "/database/factories/**/*{.ts,.js}"],
  },
  // poolSize: 20,
  // migrationsTableName: "migrations",
  synchronize: true,
  timezone: "UTC+06",
  // migrationsRun: true, // Run migrations automatically,
  logging: true,
  // logger: 'file',//
  // migrations: [sourcePath + "database/migrations/**/*{.ts,.js}"],
};
export default DatabaseConfig;

import { Seeder } from "typeorm-seeding";
import AppDataSource from "../../config/datasource";
import { PermissionModuleEntity } from "../entities/permission-module.entity";

export class PermissionModuleSeed implements Seeder {
  async run(): Promise<any> {
    const data: any[] = [
      {
        id: 1,
        name: "USER",
      },
      {
        id: 2,
        name: "PERMISSION",
      },
      {
        id: 3,
        name: "CLASS",
      },
      {
        id: 4,
        name: "SUBJECT",
      },
      {
        id: 5,
        name: "CHAPTER",
      },
      {
        id: 6,
        name: "EXAM",
      },
    ];

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");

    await AppDataSource.getRepository(PermissionModuleEntity).clear();

    await AppDataSource.getRepository(PermissionModuleEntity).save(data);

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
  }
}

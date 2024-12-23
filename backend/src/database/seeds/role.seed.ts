import { Seeder } from "typeorm-seeding";
import AppDataSource from "../../config/datasource";
import { RoleEntity } from "../entities/role.entity";

export class RoleSeed implements Seeder {
  data: any[] = [
    {
      id: 1,
      name: "Admin",
      role_id: 1,
    },
  ];

  async run(): Promise<any> {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");

    await AppDataSource.getRepository(RoleEntity).clear();

    await AppDataSource.getRepository(RoleEntity).save(this.data);

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
  }
}

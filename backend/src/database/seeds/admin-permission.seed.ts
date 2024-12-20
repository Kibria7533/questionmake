import AppDataSource from "../../config/datasource";
import { RolePermissionsEntity } from "../entities/role-permissions.entity";
import { PermissionSeed } from "./permission.seed";

export class AdminPermissionSeed {
  async run(): Promise<any> {
    const data: any[] = [];

    new PermissionSeed().data.map((item) => {
      data.push({
        role_id: 1,
        permission_id: item.id,
      });
    });

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");

    await AppDataSource.getRepository(RolePermissionsEntity).clear();

    await AppDataSource.getRepository(RolePermissionsEntity).save(data);

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
  }
}

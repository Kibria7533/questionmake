import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PermissionEntity } from "../entities/permission.entity";

@Injectable()
export class PermissionRepository extends Repository<PermissionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }

  async findWithModules(): Promise<any[]> {
    return this.createQueryBuilder("permission")
      .leftJoin("permission_modules", "module", "permission.module_id = module.id")
      .select([
        "permission.id AS id",
        "permission.name AS name",
        "permission.module_id AS module_id",
        "module.name AS module_name",
      ])
      .getRawMany(); // Fetch raw results instead of mapped entities
  }

  async findOneWithModule(id: number): Promise<any> {
    return this.createQueryBuilder("permission")
      .leftJoin("permission_modules", "module", "permission.module_id = module.id")
      .where("permission.id = :id", { id })
      .select([
        "permission.id AS id",
        "permission.name AS name",
        "permission.module_id AS module_id",
        "module.name AS module_name",
      ])
      .getRawOne();
  }
}

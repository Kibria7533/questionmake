import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolePermissionsEntity } from "../entities/role-permissions.entity";
import { PermissionEntity } from "../entities/permission.entity";
import { TABLE_PERMISSIONS } from "../../config/database.table";

@Injectable()
export class RolePermissionRepository extends Repository<RolePermissionsEntity> {
  constructor(@InjectRepository(RolePermissionsEntity) repository: Repository<RolePermissionsEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getPermissionsByRoleId(role_id: number): Promise<PermissionEntity[]> {
    return this.createQueryBuilder("role_permissions")
      .select(["permission.id as id", "permission.name as name"])
      .where("role_permissions.role_id = :role_id", { role_id })
      .leftJoin(TABLE_PERMISSIONS, "permission", "permission.id = role_permissions.permission_id")
      .getRawMany();
  }
}

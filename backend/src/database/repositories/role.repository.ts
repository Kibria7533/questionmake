import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entities/role.entity";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getOneWithPermissions(id: number): Promise<RoleEntity> {
    return this.createQueryBuilder("role")
      .select(["role.id", "role.name", "permissions.id", "permissions.role_id", "permissions.permission_id"])
      .where("role.id = :id", { id })
      .leftJoin("role.permissions", "permissions")
      .getOne();
  }
}

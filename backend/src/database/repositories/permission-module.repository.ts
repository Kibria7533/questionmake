import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionModuleEntity } from "../entities/permission-module.entity";

@Injectable()
export class PermissionModuleRepository extends Repository<PermissionModuleEntity> {
  constructor(@InjectRepository(PermissionModuleEntity) repository: Repository<PermissionModuleEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionEntity } from "../../database/entities/permission.entity";
import { PermissionController } from "./permission/permission.controller";
import { PermissionService } from "./permission/permission.service";
import { PermissionRepository } from "../../database/repositories/permission.repository";
import { PermissionModuleController } from "./permission-module/permission-module.controller";
import { PermissionModuleService } from "./permission-module/permission-module.service";
import { PermissionModuleEntity } from "../../database/entities/permission-module.entity";
import { PermissionModuleRepository } from "../../database/repositories/permission-module.repository";
import { RoleRepository } from "../../database/repositories/role.repository";
import { RoleController } from "./role/role.controller";
import { RoleService } from "./role/role.service";
import { RoleEntity } from "../../database/entities/role.entity";
import { RolePermissionsEntity } from "../../database/entities/role-permissions.entity";
import { RolePermissionRepository } from "../../database/repositories/role-permission.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PermissionModuleEntity, PermissionEntity, RoleEntity, RolePermissionsEntity])],
  controllers: [PermissionModuleController, PermissionController, RoleController],
  providers: [
    PermissionModuleService,
    PermissionModuleRepository,
    PermissionService,
    PermissionRepository,
    RoleService,
    RoleRepository,
    RolePermissionRepository,
  ],
  exports: [PermissionService, PermissionModuleService, RoleService],
})
export class PermissionManagerModule {}

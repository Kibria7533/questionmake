import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { PermissionModuleService } from "./permission-module.service";
import { PrivateBaseController } from "../../../guards/private.base.controller";
import { PermissionEntity } from "../../../database/entities/permission.entity";
import { HasPermission } from "../../../config/meta.data";
import { Permissions } from "../../../config/permissions";

@Controller("permission-modules")
export class PermissionModuleController extends PrivateBaseController {
  @Inject()
  private readonly service: PermissionModuleService;

  @Get()
  @HasPermission([Permissions.GET_PERMISSION_MODULE])
  async getAll(): Promise<PermissionEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  @HasPermission([Permissions.GET_PERMISSION_MODULE])
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<PermissionEntity> {
    return this.service.getOneById(id);
  }
}

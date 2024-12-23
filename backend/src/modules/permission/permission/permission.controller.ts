import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PrivateBaseController } from "../../../guards/private.base.controller";
import { PermissionEntity } from "../../../database/entities/permission.entity";
import { HasPermission } from "../../../config/meta.data";
import { Permissions } from "../../../config/permissions";

@Controller("permissions")
export class PermissionController extends PrivateBaseController {
  @Inject()
  private readonly service: PermissionService;

  @Get()
  @HasPermission([Permissions.GET_PERMISSION])
  async getAll(): Promise<PermissionEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  @HasPermission([Permissions.GET_PERMISSION])
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<PermissionEntity> {
    return this.service.getOneById(id);
  }
}

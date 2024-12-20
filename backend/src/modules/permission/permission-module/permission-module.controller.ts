import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { PermissionModuleService } from "./permission-module.service";
import { PrivateBaseController } from "../../../guards/private.base.controller";
import { PermissionEntity } from "../../../database/entities/permission.entity";

@Controller("permission-modules")
export class PermissionModuleController extends PrivateBaseController {
  @Inject()
  private readonly service: PermissionModuleService;

  @Get()
  async getAll(): Promise<PermissionEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<PermissionEntity> {
    return this.service.getOneById(id);
  }
}

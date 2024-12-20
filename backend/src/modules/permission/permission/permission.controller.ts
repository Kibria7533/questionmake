import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PrivateBaseController } from "../../../guards/private.base.controller";
import { PermissionEntity } from "../../../database/entities/permission.entity";

@Controller("permissions")
export class PermissionController extends PrivateBaseController {
  @Inject()
  private readonly service: PermissionService;

  @Get()
  async getAll(): Promise<PermissionEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<PermissionEntity> {
    return this.service.getOneById(id);
  }
}

import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { RoleService } from "./role.service";
import { PrivateBaseController } from "../../../guards/private.base.controller";
import { RoleEntity } from "../../../database/entities/role.entity";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { AssignPermissionsDto } from "./dto/assign-permissions.dto";
import { HasPermission } from "../../../config/meta.data";
import { Permissions } from "../../../config/permissions";

@Controller("roles")
export class RoleController extends PrivateBaseController {
  @Inject()
  private readonly service: RoleService;

  @Post()
  @HasPermission([Permissions.CREATE_UPDATE_ROLE])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateRoleDto): Promise<RoleEntity> {
    return this.service.create(reqDto);
  }

  @Put(":id")
  @HasPermission([Permissions.CREATE_UPDATE_ROLE])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.service.update(id, reqDto);
  }

  @Put(":id/assign-permissions")
  @HasPermission([Permissions.CREATE_UPDATE_ROLE])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async assignPermissions(@Param("id", ParseIntPipe) id: number, @Body() reqDto: AssignPermissionsDto): Promise<RoleEntity> {
    return this.service.assignPermissions(id, reqDto);
  }

  @Get()
  @HasPermission([Permissions.GET_ROLE])
  async getAll(): Promise<RoleEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  @HasPermission([Permissions.GET_ROLE])
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<RoleEntity> {
    return this.service.getOneById(id);
  }

  @Get(":id/permissions")
  @HasPermission([Permissions.GET_ROLE])
  async getOneWithPermissions(@Param("id", ParseIntPipe) id: number): Promise<RoleEntity> {
    return this.service.getOneWithPermissions(id);
  }

  @Delete(":id")
  @HasPermission([Permissions.DELETE_ROLE])
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}

import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { HasPermission } from "../../config/meta.data";
import { Role } from "../../config/enum";
import { ChangeRoleDto } from "./dto/change-role.dto";
import { PrivateBaseController } from "../../guards/private.base.controller";

@Controller("users")
export class UserController extends PrivateBaseController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  @HasPermission([Role.ADMIN])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async createUser(@Body() reqDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(reqDto);
  }

  @Get()
  @HasPermission([Role.ADMIN])
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(":id")
  @HasPermission([Role.ADMIN])
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.getOneById(id);
  }

  @Put("change-role")
  @HasPermission([Role.ADMIN])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async changeRole(@Body() reqDto: ChangeRoleDto): Promise<UserEntity> {
    return this.userService.changeRole(reqDto);
  }
}

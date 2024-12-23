import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { HasPermission } from "../../config/meta.data";
import { ChangeRoleDto } from "./dto/change-role.dto";
import { PrivateBaseController } from "../../guards/private.base.controller";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Controller("users")
export class UserController extends PrivateBaseController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  @HasPermission([])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(reqDto);
  }

  @Post()
  @HasPermission([])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateUserDto): Promise<UserEntity> {
    return this.userService.update(id, reqDto);
  }

  @Get()
  @HasPermission([])
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get("profile")
  async getProfile(): Promise<UserEntity> {
    return this.userService.getProfile();
  }

  @Get(":id")
  @HasPermission([])
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.getOneById(id);
  }

  @Put("change-role")
  @HasPermission([])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async changeRole(@Body() reqDto: ChangeRoleDto): Promise<UserEntity> {
    return this.userService.changeRole(reqDto);
  }


  @Put(":id/status")
  @HasPermission([])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() reqDto: UpdateStatusDto
  ): Promise<UserEntity> {
    return this.userService.updateStatus(id, reqDto.status);
  }
}

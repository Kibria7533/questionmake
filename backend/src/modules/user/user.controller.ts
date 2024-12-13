import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";

@Controller("users")
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async createUser(@Body() reqDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(reqDto);
  }

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}

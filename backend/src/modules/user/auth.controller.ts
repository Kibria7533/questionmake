import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  @Inject()
  private readonly userService: UserService;

  @Post("login")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async login(@Body() reqDto: LoginDto): Promise<UserEntity> {
    return this.userService.login(reqDto);
  }

  @Post("registration")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async registration(@Body() reqDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(reqDto);
  }
}

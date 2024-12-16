import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { PublicBaseController } from "../../guards/public.base.controller";

@Controller("auth")
export class AuthController extends PublicBaseController {
  @Inject()
  private readonly authService: AuthService;

  @Post("login")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async login(@Body() reqDto: LoginDto): Promise<UserEntity> {
    return this.authService.login(reqDto);
  }

  @Post("registration")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async registration(@Body() reqDto: CreateUserDto): Promise<UserEntity> {
    return this.authService.registration(reqDto);
  }
}

import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async login(reqDto: LoginDto): Promise<any> {
    const user: UserEntity = await this.userService.getOneByMobile(reqDto.mobile);

    if (!user) {
      throw new BadRequestException("User does not exist");
    }

    const isMatch = await bcrypt.compare(reqDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException("User or Password doesn't match");
    }

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registration(reqDto: CreateUserDto): Promise<any> {
    return this.userService.create(reqDto);
  }
}

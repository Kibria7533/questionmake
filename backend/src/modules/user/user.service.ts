import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { HASH_ROUND } from "../../config/constant";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly jwtService: JwtService;

  async create(reqDto: CreateUserDto): Promise<UserEntity> {
    const isExist: UserEntity = await this.getOneByMobile(reqDto.mobile);

    if (isExist?.id) {
      throw new BadRequestException("User already exists");
    }

    if (reqDto.password != reqDto.confirm_password) {
      throw new BadRequestException("Password doesn't matched");
    }

    reqDto.password = await bcrypt.hash(reqDto.password, HASH_ROUND);

    let user: UserEntity = this.userRepository.create(reqDto);
    user = await this.userRepository.save(user);
    user.password = undefined;
    return user;
  }

  async login(reqDto: LoginDto): Promise<any> {
    const user: UserEntity = await this.getOneByMobile(reqDto.mobile);

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

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ mobile });
  }
}

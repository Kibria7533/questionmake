import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import * as bcrypt from "bcrypt";
import { HASH_ROUND } from "../../config/constant";
import { Role } from "../../config/enum";
import { ChangeRoleDto } from "./dto/change-role.dto";

@Injectable()
export class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

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
    user.role = Role.REGULAR;

    user = await this.userRepository.save(user);

    user.password = undefined;
    user.role = undefined;
    return user;
  }

  async changeRole(reqDto: ChangeRoleDto): Promise<UserEntity> {
    let user: UserEntity = await this.getOneById(reqDto.user_id);

    if (!user) {
      throw new BadRequestException("User doesn't exists");
    }

    user.role = reqDto.role;
    user = await this.userRepository.save(user);
    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.getAll();
  }

  async getAuthUser(sub: number): Promise<UserEntity> {
    return this.userRepository.getAuthUser(sub);
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.userRepository.getOneByMobile(mobile);
  }

  async getOneById(id: number): Promise<UserEntity> {
    return this.userRepository.getOneById(id);
  }
}

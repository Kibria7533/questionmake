import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";
import * as bcrypt from "bcrypt";
import { HASH_ROUND } from "../../config/constant";
import { Role } from "../../config/enum";
import { ChangeRoleDto } from "./dto/change-role.dto";
import { RoleService } from "../permission/role/role.service";
import { PermissionEntity } from "../../database/entities/permission.entity";
import { AuthUser } from "../../config/alc";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilterUserDto } from "./dto/filter-user.dto";

@Injectable()
export class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly roleService: RoleService;

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
    user.role = undefined;
    return user;
  }

  async update(id: number, reqDto: UpdateUserDto): Promise<UserEntity> {
    const isExist: UserEntity = await this.getOneByMobile(reqDto.mobile);

    if (isExist?.id && id != isExist.id) {
      throw new BadRequestException("User already exists");
    }

    let user: UserEntity = this.userRepository.create(reqDto);
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

  async getAll(reqDto: FilterUserDto): Promise<UserEntity[]> {
    const users = await this.userRepository.getAll(reqDto);
    for (const user of users) {
      if (user.role !== undefined) {
        // Fetch the role details using RoleService
        const roleDetails = await this.roleService.getOneById(user.role);
        user.rolename = roleDetails.name;
        user.permissions = roleDetails.permissions; // Assuming roleDetails has permissions
      }
    }

    return users;
  }

  async getAuthUser(sub: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.getAuthUser(sub);
    if (user?.id) {
      const permissions: PermissionEntity[] = await this.roleService.getPermissionsByRoleId(user.role);
      user.permission_keys = permissions?.map((item: PermissionEntity) => {
        return item.name;
      });
    }
    return user;
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.userRepository.getOneByMobile(mobile);
  }

  async getOneById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.getOneById(id);
    if (user) {
      const roleDetails = await this.roleService.getOneById(user.role);
      user.rolename = roleDetails.name;
      user.permissions = roleDetails.permissions; // Assuming roleDetails has permissions
    }
    return user;
  }

  async getProfile(): Promise<UserEntity> {
    const authUser: UserEntity = AuthUser.get();
    return this.userRepository.getOneById(authUser.id);
  }

  async updateStatus(id: number, status: boolean): Promise<UserEntity> {
    const user: UserEntity = await this.getOneById(id);

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }

    user.status = status;
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }
}

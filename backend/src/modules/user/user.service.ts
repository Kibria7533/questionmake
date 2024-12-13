import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "../../database/entities/user.entity";

@Injectable()
export class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  async create(reqDto: CreateUserDto): Promise<UserEntity> {
    // validate: mobile number already exist
    const isExist: UserEntity = await this.getOneByMobile(reqDto.mobile);

    if (isExist?.id) {
      throw new BadRequestException("User already exists");
    }

    const user: UserEntity = this.userRepository.create(reqDto);
    return this.userRepository.save(user);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ mobile });
  }
}

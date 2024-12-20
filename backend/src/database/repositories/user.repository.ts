import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.find({ select: ["id", "name", "mobile", "email", "dob"] });
  }

  async getAuthUser(sub: number): Promise<UserEntity> {
    return this.findOne({ where: { id: sub }, select: ["id", "name", "mobile", "email", "role"] });
  }

  async getOneById(id: number): Promise<UserEntity> {
    return this.findOne({ where: { id }, select: ["id", "name", "mobile", "email", "role"] });
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.findOne({ where: { mobile }, select: ["id", "name", "mobile", "password"] });
  }

  async getOneForLogin(mobile: string): Promise<UserEntity> {
    return this.findOne({ where: { mobile }, select: ["id", "password"] });
  }
}

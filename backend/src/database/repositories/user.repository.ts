import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.find({ select: ["_id", "name", "mobile", "email", "dob"] });
  }

  async getAuthUser(sub: string): Promise<UserEntity> {
    return this.findOne({ where: { _id: new ObjectId(sub) }, select: ["_id", "name", "mobile", "email", "role"] });
  }

  async getOneById(id: string): Promise<UserEntity> {
    return this.findOne({ where: { _id: new ObjectId(id) }, select: ["_id", "name", "mobile", "email", "role"] });
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.findOne({ where: { mobile }, select: ["_id", "name", "mobile", "password"] });
  }

  async getOneForLogin(mobile: string): Promise<UserEntity> {
    return this.findOne({ where: { mobile }, select: ["_id", "password"] });
  }
}

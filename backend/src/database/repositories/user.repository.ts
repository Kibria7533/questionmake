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
    return this.find({ select: ["id", "name", "mobile", "email", "dob","role","status"] });
  }

  async getAuthUser(sub: number): Promise<UserEntity> {
    return this.findOne({ where: { id: sub }, select: ["id", "name", "mobile", "email", "role"] });
  }

  async getOneById(id: number): Promise<UserEntity> {
    return this.createQueryBuilder("users")
      .select(["users.id", "users.name", "users.mobile", "users.email", "users.role","users.status"])
      .where("users.id = :id", { id })
      .getOne();
  }

  async getOneByMobile(mobile: string): Promise<UserEntity> {
    return this.findOne({ where: { mobile }, select: ["id", "name", "mobile", "password"] });
  }

  async getOneForLogin(mobile: string): Promise<UserEntity> {
    return this.findOne({ where: { mobile }, select: ["id", "password"] });
  }
}

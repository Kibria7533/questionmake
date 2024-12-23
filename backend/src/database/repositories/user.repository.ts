import { Repository, SelectQueryBuilder } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { FilterUserDto } from "../../modules/user/dto/filter-user.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(reqDto: FilterUserDto): Promise<UserEntity[]> {
    const builder: SelectQueryBuilder<UserEntity> = this.createQueryBuilder("users").select([
      "users.id",
      "users.name",
      "users.mobile",
      "users.email",
      "users.dob",
      "users.role",
      "users.status",
    ]);

    if (reqDto?.role) {
      builder.andWhere("users.role = :role", { role: reqDto.role });
    }

    return builder.getMany();
  }

  async getAuthUser(sub: number): Promise<UserEntity> {
    return this.findOne({ where: { id: sub }, select: ["id", "name", "mobile", "email", "role"] });
  }

  async getOneById(id: number): Promise<UserEntity> {
    return this.createQueryBuilder("users")
      .select(["users.id", "users.name", "users.mobile", "users.email", "users.role", "users.status"])
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

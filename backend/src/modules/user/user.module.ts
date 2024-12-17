import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "../../database/repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../database/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "../../database/repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import { PermissionManagerModule } from "../permission/permission-manager.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PermissionManagerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

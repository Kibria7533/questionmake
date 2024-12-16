import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "../../database/repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRE, JWT_SECRET } from "../../config/constant";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

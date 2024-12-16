import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../database/entities/user.entity";
import { AuthUser } from "../config/alc";
import { BEARER_TOKEN_KEY } from "../config/constant";
import { LoginDto } from "../modules/user/dto/login.dto";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userToken: any = req.headers[BEARER_TOKEN_KEY];
    const token: string = userToken?.split(" ")[1];

    console.log("token => ", token);

    if (!token) {
      return next();
    }

    const jwtPayload: any = this.jwtService.decode(token, { json: true });

    console.log("sub => ", jwtPayload.sub);

    if (!jwtPayload?.sub) {
      return next();
    }

    const user: UserEntity = await this.userService.getAuthUser(jwtPayload?.sub);

    AuthUser.set(user);

    next();
  }
}

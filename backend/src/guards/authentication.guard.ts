import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthUser } from "../config/alc";
import { PERMISSION_KEY } from "../config/meta.data";
import { UserEntity } from "../database/entities/user.entity";
import { isNumeric } from "../config/validations/is-number-string.validator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles: number[] = this.reflector.get<number[]>(PERMISSION_KEY, context.getHandler());
    const user: UserEntity = AuthUser.get();

    if (!user?._id) {
      throw new UnauthorizedException("Unauthenticated Action. Login Required!");
    }

    if (requiredRoles?.length <= 0) {
      return true;
    }

    const userRole: number = isNumeric(user.role) ? parseInt(String(user.role)) : user.role;

    return requiredRoles.includes(userRole);
  }
}

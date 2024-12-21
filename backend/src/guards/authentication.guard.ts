import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthUser } from "../config/alc";
import { PERMISSION_KEY } from "../config/meta.data";
import { UserEntity } from "../database/entities/user.entity";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let requirePermissions: string[] = this.reflector.get<string[]>(PERMISSION_KEY, context.getHandler());
    requirePermissions = requirePermissions?.length ? requirePermissions : [];
    const user: UserEntity = AuthUser.get();

    // console.log(user);

    if (!user?.id) {
      throw new UnauthorizedException("Unauthenticated Action. Login Required!");
    }

    // when private controller but no permission need
    if (requirePermissions?.length <= 0) {
      return true;
    }

    console.log(requirePermissions);

    const userPermissions: string[] = user?.permission_keys ?? [];

    return requirePermissions.some((permissionKey) => userPermissions.includes(permissionKey));
  }
}

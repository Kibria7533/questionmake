import { SetMetadata } from "@nestjs/common";
import { isArray } from "class-validator";

export const IS_PUBLIC_KEY = "is_public";
export const PERMISSION_KEY = "permission_key";
export const Public = (): any => SetMetadata(IS_PUBLIC_KEY, true);

export const HasPermission = (role: number | number[]): any => {
  const roles: number[] = isArray(role) ? role : [role];

  return SetMetadata(PERMISSION_KEY, roles);
};
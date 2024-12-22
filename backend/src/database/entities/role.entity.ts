import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_ROLES } from "../../config/database.table";
import { RolePermissionsEntity } from "./role-permissions.entity";
import { PermissionEntity } from "./permission.entity";

@Entity(TABLE_ROLES)
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RolePermissionsEntity, (role_permission) => role_permission.role)
  role_permissions: RolePermissionsEntity[];

  @Column()
  roleID: number;
  // virtual
  permissions: PermissionEntity[];
}

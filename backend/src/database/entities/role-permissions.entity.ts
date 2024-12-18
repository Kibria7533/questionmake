import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_ROLE_PERMISSIONS } from "../../config/database.table";
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "./permission.entity";

@Entity(TABLE_ROLE_PERMISSIONS)
export class RolePermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_id: number;

  @Column()
  permission_id: number;

  @ManyToOne(() => RoleEntity, (role) => role.role_permissions)
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;

  @OneToOne(() => PermissionEntity)
  @JoinColumn({ name: "permission_id" })
  permission: PermissionEntity;
}

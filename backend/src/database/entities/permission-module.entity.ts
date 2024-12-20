import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_PERMISSION_MODULES } from "../../config/database.table";

@Entity(TABLE_PERMISSION_MODULES)
export class PermissionModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

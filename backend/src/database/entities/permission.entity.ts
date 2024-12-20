import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_PERMISSIONS } from "../../config/database.table";

@Entity(TABLE_PERMISSIONS)
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  module_id: number;
}

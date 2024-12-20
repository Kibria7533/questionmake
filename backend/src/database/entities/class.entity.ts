import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_CLASSES } from "../../config/database.table";

@Entity(TABLE_CLASSES)
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

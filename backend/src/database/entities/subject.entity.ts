import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_SUBJECTS } from "../../config/database.table";

@Entity(TABLE_SUBJECTS)
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

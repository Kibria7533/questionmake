import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_QUESTION_TYPES } from "../../config/database.table";

@Entity(TABLE_QUESTION_TYPES)
export class QuestionTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

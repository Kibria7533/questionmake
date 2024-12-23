import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_EXAM_CATEGORIES } from "../../config/database.table";
import { ExamEntity } from "./exam.entity";
import { BooleanStatus } from "../../config/enum";
import { enumToString } from "../../config/utils";

@Entity(TABLE_EXAM_CATEGORIES)
export class ExamCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  feedback: string;

  @Column({ nullable: true })
  logo_path: string;

  @Column({ nullable: true, comment: enumToString(BooleanStatus), default: BooleanStatus.NO })
  is_popular: number;

  @OneToMany(() => ExamEntity, (exam) => exam.category)
  exams: ExamEntity[];
}

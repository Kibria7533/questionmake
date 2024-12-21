import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_EXAM_CATEGORIES } from "../../config/database.table";
import { ExamEntity } from "./exam.entity";

@Entity(TABLE_EXAM_CATEGORIES)
export class ExamCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  feedback: string;

  @Column({ nullable: true })
  logo_path: string;

  @OneToMany(() => ExamEntity, (exam) => exam.category)
  exams: ExamEntity[];
}

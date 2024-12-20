import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TABLE_EXAMS } from "../../config/database.table";
import { ExamCategoryEntity } from "./exam-category.entity";

@Entity(TABLE_EXAMS)
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  exam_category_id: number;

  @Column()
  questions: number; // Number of questions in the exam

  @Column()
  passed: number; // Number of students who passed

  @Column({ type: "varchar", length: 10 })
  score: string; // Average score (e.g., "95.1%")

  @Column({ type: "text" })
  description: string; // Description of the exam

  @ManyToOne(() => ExamCategoryEntity, (exam) => exam.exams)
  @JoinColumn({ name: "exam_category_id" })
  category: ExamCategoryEntity;
}

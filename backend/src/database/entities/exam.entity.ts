import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => ExamCategoryEntity, (exam) => exam.exams)
  @JoinColumn({ name: "exam_category_id" })
  category: ExamCategoryEntity;
}

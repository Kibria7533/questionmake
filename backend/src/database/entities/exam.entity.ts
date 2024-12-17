import { Column, Entity, ObjectIdColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { TABLE_EXAMS } from "../../config/database.table";
import { ExamCategoryEntity } from "./exam-category.entity";

@Entity(TABLE_EXAMS)
export class ExamEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  exam_category_id: string;

  @ManyToOne(() => ExamCategoryEntity, (exam) => exam.exams)
  @JoinColumn({ name: "exam_category_id", referencedColumnName: "_id" })
  category: ExamCategoryEntity;
}

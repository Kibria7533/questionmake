import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";
import { ObjectId } from "mongodb";
import { TABLE_EXAM_CATEGORIES } from "../../config/database.table";
import { ExamEntity } from "./exam.entity";

@Entity(TABLE_EXAM_CATEGORIES)
export class ExamCategoryEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @OneToMany(() => ExamEntity, (exam) => exam.category)
  exams: ExamEntity[];
}

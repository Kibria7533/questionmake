import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_CHAPTERS } from "../../config/database.table";

@Entity(TABLE_CHAPTERS)
export class ChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

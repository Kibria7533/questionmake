import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_CONTACTS } from "../../config/database.table";

@Entity(TABLE_CONTACTS)
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  email: string;

  @Column({ type: "text" })
  body: string;
}

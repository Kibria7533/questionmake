import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../config/enum";
import { TABLE_USERS } from "../../config/database.table";
import { enumToString } from "../../config/utils";

@Entity(TABLE_USERS)
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: "date" })
  dob: string;

  @Column({ select: false, comment: enumToString(Role), type: "int", default: Role.REGULAR })
  role: number;
}

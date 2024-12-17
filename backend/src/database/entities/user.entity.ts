import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";
import { Role } from "../../config/enum";
import { TABLE_USERS } from "../../config/database.table";

@Entity(TABLE_USERS)
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  dob: string;

  @Column({ select: false, enum: Role, default: Role.REGULAR })
  role: number;
}

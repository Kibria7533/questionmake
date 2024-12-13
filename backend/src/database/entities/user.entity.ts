import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  dob: string;
}

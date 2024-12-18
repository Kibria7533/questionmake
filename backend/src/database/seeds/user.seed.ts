import { Seeder } from "typeorm-seeding";
import AppDataSource from "../../config/datasource";
import { UserEntity } from "../entities/user.entity";
import { HASH_ROUND } from "../../config/constant";
import * as bcrypt from "bcrypt";
import { Role } from "../../config/enum";

export class UserSeeder implements Seeder {
  async run(): Promise<any> {
    const data: any[] = [
      {
        id: 1,
        name: "admin",
        mobile: "8801777112233",
        email: "admin@admin.com",
        dob: "2024-12-12",
        password: bcrypt.hashSync("1234", HASH_ROUND),
        role: Role.ADMIN,
      },
    ];

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");

    await AppDataSource.getRepository(UserEntity).clear();

    await AppDataSource.getRepository(UserEntity).save(data);

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
  }
}

import { Seeder } from "typeorm-seeding";
import AppDataSource from "../../config/datasource";
import { PermissionEntity } from "../entities/permission.entity";
import { Permissions } from "../../config/permissions";

export class PermissionSeed implements Seeder {
  async run(): Promise<any> {
    const data: any[] = [
      // USER
      {
        id: 1,
        name: Permissions.CREATE_UPDATE_USER,
        module_id: 1,
      },
      {
        id: 2,
        name: Permissions.CHANGE_ROLE,
        module_id: 1,
      },
      {
        id: 3,
        name: Permissions.GET_USER,
        module_id: 1,
      },

      // PERMISSION
      {
        id: 20,
        name: Permissions.GET_PERMISSION_MODULE,
        module_id: 2,
      },
      {
        id: 21,
        name: Permissions.GET_PERMISSION,
        module_id: 2,
      },
      {
        id: 22,
        name: Permissions.CREATE_UPDATE_ROLE,
        module_id: 2,
      },
      {
        id: 23,
        name: Permissions.GET_ROLE,
        module_id: 2,
      },
      {
        id: 24,
        name: Permissions.DELETE_ROLE,
        module_id: 2,
      },

      // CLASS
      {
        id: 40,
        name: Permissions.CREATE_UPDATE_CLASS,
        module_id: 3,
      },
      {
        id: 41,
        name: Permissions.GET_CLASS,
        module_id: 3,
      },
      {
        id: 42,
        name: Permissions.DELETE_CLASS,
        module_id: 3,
      },

      // SUBJECT
      {
        id: 60,
        name: Permissions.CREATE_UPDATE_SUBJECT,
        module_id: 4,
      },
      {
        id: 61,
        name: Permissions.GET_SUBJECT,
        module_id: 4,
      },
      {
        id: 62,
        name: Permissions.DELETE_SUBJECT,
        module_id: 4,
      },

      // CHAPTER
      {
        id: 80,
        name: Permissions.CREATE_UPDATE_CHAPTER,
        module_id: 5,
      },
      {
        id: 81,
        name: Permissions.GET_CHAPTER,
        module_id: 5,
      },
      {
        id: 82,
        name: Permissions.DELETE_CHAPTER,
        module_id: 5,
      },

      // EXAM TYPE
      {
        id: 100,
        name: Permissions.CREATE_UPDATE_EXAM_TYPE,
        module_id: 6,
      },
      {
        id: 101,
        name: Permissions.GET_EXAM_TYPE,
        module_id: 6,
      },
      {
        id: 102,
        name: Permissions.DELETE_EXAM_TYPE,
        module_id: 6,
      },
      // EXAM CATEGORY
      {
        id: 120,
        name: Permissions.CREATE_UPDATE_EXAM_CATEGORY,
        module_id: 6,
      },
      {
        id: 121,
        name: Permissions.GET_EXAM_CATEGORY,
        module_id: 6,
      },
      {
        id: 122,
        name: Permissions.DELETE_EXAM_CATEGORY,
        module_id: 6,
      },
      // EXAM
      {
        id: 140,
        name: Permissions.CREATE_UPDATE_EXAM,
        module_id: 6,
      },
      {
        id: 141,
        name: Permissions.GET_EXAM,
        module_id: 6,
      },
      {
        id: 142,
        name: Permissions.DELETE_EXAM,
        module_id: 6,
      },
    ];

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");

    await AppDataSource.getRepository(PermissionEntity).clear();

    await AppDataSource.getRepository(PermissionEntity).save(data);

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
  }
}

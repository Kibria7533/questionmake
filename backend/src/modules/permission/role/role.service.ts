import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "../../../database/repositories/role.repository";
import { RoleEntity } from "../../../database/entities/role.entity";
import { Not, QueryRunner, DataSource } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { AssignPermissionsDto } from "./dto/assign-permissions.dto";
import { RolePermissionRepository } from "../../../database/repositories/role-permission.repository";
import { RolePermissionsEntity } from "../../../database/entities/role-permissions.entity";
import { PermissionEntity } from "../../../database/entities/permission.entity";

@Injectable()
export class RoleService {
  @Inject()
  private readonly repository: RoleRepository;

  @Inject()
  private readonly rolePermissionRepository: RolePermissionRepository;

  @Inject()
  private readonly dataSource: DataSource;

  async create(reqDto: CreateRoleDto): Promise<RoleEntity> {
    if (await this.isNameExist(reqDto.name)) {
      throw new BadRequestException("Role already exist");
    }

    const result: RoleEntity = this.repository.create(reqDto);
    return this.repository.save(result);
  }

  async update(id: number, reqDto: UpdateRoleDto): Promise<RoleEntity> {
    if (await this.isNameExist(reqDto.name, id)) {
      throw new BadRequestException("Role already exist");
    }

    const result: RoleEntity = await this.getOneByIdOrFail(id);
    Object.assign(result, reqDto);
    return this.repository.save(result);
  }

  async assignPermissions(id: number, reqDto: AssignPermissionsDto): Promise<RoleEntity> {
    const role: RoleEntity = await this.getOneByIdOrFail(id);

    const permissions: RolePermissionsEntity[] = [];
    reqDto?.permission_ids?.map((item) => {
      const permission = new RolePermissionsEntity();
      permission.permission_id = item;
      permission.role_id = id;
      permissions.push(permission);
    });

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(RolePermissionsEntity, { role_id: id });
      await queryRunner.manager.save(RolePermissionsEntity, permissions);
      await queryRunner.manager.save(role);

      await queryRunner.commitTransaction();
      return role;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async getOneWithPermissions(id: number): Promise<RoleEntity> {
    const role: RoleEntity = await this.getOneByIdOrFail(id);
    role.permissions = await this.getPermissionsByRoleId(id);
    return role;
  }

  async getPermissionsByRoleId(id: number): Promise<PermissionEntity[]> {
    return (await this.rolePermissionRepository.getPermissionsByRoleId(id)) ?? [];
  }

  async getAll(): Promise<RoleEntity[]> {
    return this.repository.find();
  }

  async getOneByIdOrFail(id: number): Promise<RoleEntity> {
    return this.repository.findOneByOrFail({ id });
  }

  async getOneById(id: number): Promise<RoleEntity> {
    return this.repository.findOneBy({ id });
  }

  async isNameExist(name: string, id?: number): Promise<boolean> {
    const query = new RoleEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    const isExist: RoleEntity = await this.repository.findOneBy(query);
    return !!isExist;
  }

  async delete(id: string): Promise<DeleteResult> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(RolePermissionsEntity, { role_id: id });
      const result: DeleteResult = await queryRunner.manager.delete(RoleEntity, { id });

      await queryRunner.commitTransaction();
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}

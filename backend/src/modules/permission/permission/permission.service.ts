import { Inject, Injectable } from "@nestjs/common";
import { PermissionEntity } from "../../../database/entities/permission.entity";
import { PermissionRepository } from "../../../database/repositories/permission.repository";

@Injectable()
export class PermissionService {
  @Inject()
  private readonly repository: PermissionRepository;

  async getAll(): Promise<PermissionEntity[]> {
    return this.repository.find();
  }

  async getOneById(id: number): Promise<PermissionEntity> {
    return this.repository.findOneBy({ id });
  }
}

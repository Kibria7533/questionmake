import { Inject, Injectable } from "@nestjs/common";
import { PermissionRepository } from "../../../database/repositories/permission.repository";

@Injectable()
export class PermissionService {
  @Inject()
  private readonly repository: PermissionRepository;

  async getAll(): Promise<any[]> {
    return this.repository.findWithModules();
  }

  async getOneById(id: number): Promise<any> {
    return this.repository.findOneWithModule(id);
  }
}

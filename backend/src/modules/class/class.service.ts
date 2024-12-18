import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateClassDto } from "./dto/update-class.dto";
import { CreateClassDto } from "./dto/create-class.dto";
import { Not } from "typeorm";
import { ClassRepository } from "../../database/repositories/class.repository";
import { ClassEntity } from "../../database/entities/class.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";

@Injectable()
export class ClassService {
  @Inject()
  private readonly repository: ClassRepository;

  async create(reqDto: CreateClassDto): Promise<ClassEntity> {
    if (await this.isSubjectNameExist(reqDto.name)) {
      throw new BadRequestException("Class already exist");
    }

    const result: ClassEntity = this.repository.create(reqDto);
    return this.repository.save(result);
  }

  async update(id: number, reqDto: UpdateClassDto): Promise<ClassEntity> {
    if (await this.isSubjectNameExist(reqDto.name, id)) {
      throw new BadRequestException("Class already exist");
    }

    const result: ClassEntity = await this.getOneByIdOrFail(id);
    Object.assign(result, reqDto);
    return this.repository.save(result);
  }

  async getAll(): Promise<ClassEntity[]> {
    return this.repository.find();
  }

  async getOneByIdOrFail(id: number): Promise<ClassEntity> {
    return this.repository.findOneByOrFail({ id });
  }

  async getOneById(id: number): Promise<ClassEntity> {
    return this.repository.findOneBy({ id });
  }

  async isSubjectNameExist(name: string, id?: number): Promise<boolean> {
    const query = new ClassEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    const isExist: ClassEntity = await this.repository.findOneBy(query);
    return !!isExist;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

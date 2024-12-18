import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { SubjectRepository } from "../../database/repositories/subject.repository";
import { SubjectEntity } from "../../database/entities/subject.entity";
import { Not } from "typeorm";

@Injectable()
export class SubjectService {
  @Inject()
  private readonly repository: SubjectRepository;

  async create(reqDto: CreateSubjectDto): Promise<SubjectEntity> {
    if (await this.isSubjectNameExist(reqDto.name)) {
      throw new BadRequestException("Subject already exist");
    }

    const subject: SubjectEntity = this.repository.create(reqDto);
    return this.repository.save(subject);
  }

  async update(id: number, reqDto: UpdateSubjectDto): Promise<SubjectEntity> {
    if (await this.isSubjectNameExist(reqDto.name, id)) {
      throw new BadRequestException("Subject already exist");
    }

    const subject: SubjectEntity = await this.getOneByIdOrFail(id);
    Object.assign(subject, reqDto);
    return this.repository.save(subject);
  }

  async getAll(): Promise<SubjectEntity[]> {
    return this.repository.find();
  }

  async getOneByIdOrFail(id: number): Promise<SubjectEntity> {
    return this.repository.findOneByOrFail({ id });
  }

  async getOneById(id: number): Promise<SubjectEntity> {
    return this.repository.findOneBy({ id });
  }

  async isSubjectNameExist(name: string, id?: number): Promise<boolean> {
    const query = new SubjectEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    const isExist: SubjectEntity = await this.repository.findOneBy(query);
    return !!isExist;
  }

  async delete(id: string): Promise<any> {
    return this.repository.delete(id);
  }
}

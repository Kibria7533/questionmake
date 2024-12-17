import { Inject, Injectable } from "@nestjs/common";
import { CreateExamDto } from "./dto/create-exam.dto";
import { ExamRepository } from "../../database/repositories/exam.repository";
import { ExamEntity } from "../../database/entities/exam.entity";
import { UpdateExamDto } from "./dto/update-exam.dto";

@Injectable()
export class ExamService {
  @Inject()
  private readonly repository: ExamRepository;

  async create(reqDto: CreateExamDto): Promise<ExamEntity> {
    const exam: ExamEntity = this.repository.create(reqDto);
    return this.repository.save(exam);
  }

  async update(id: number, reqDto: UpdateExamDto): Promise<ExamEntity> {
    const exam: ExamEntity = await this.getOneByIdOrFail(id);
    Object.assign(exam, reqDto);
    return this.repository.save(exam);
  }

  async getAll(): Promise<ExamEntity[]> {
    return this.repository.getAll();
  }

  async getOneByIdOrFail(id: number): Promise<ExamEntity> {
    return this.repository.getOneByIdOrFail(id);
  }

  async getOneById(id: number): Promise<ExamEntity> {
    return this.repository.getOneById(id);
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}

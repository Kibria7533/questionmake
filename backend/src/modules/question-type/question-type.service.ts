import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateQuestionTypeDto } from "./dto/update-question-type.dto";
import { CreateQuestionTypeDto } from "./dto/create-question-type.dto";
import { Not } from "typeorm";
import { QuestionTypeEntity } from "../../database/entities/question-type.entity";
import { QuestionTypeRepository } from "../../database/repositories/question-type.repository";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";

@Injectable()
export class QuestionTypeService {
  @Inject()
  private readonly repository: QuestionTypeRepository;

  async create(reqDto: CreateQuestionTypeDto): Promise<QuestionTypeEntity> {
    if (await this.isNameExist(reqDto.name)) {
      throw new BadRequestException("Question type already exist");
    }

    const subject: QuestionTypeEntity = this.repository.create(reqDto);
    return this.repository.save(subject);
  }

  async update(id: number, reqDto: UpdateQuestionTypeDto): Promise<QuestionTypeEntity> {
    if (await this.isNameExist(reqDto.name, id)) {
      throw new BadRequestException("Question type already exist");
    }

    const subject: QuestionTypeEntity = await this.getOneByIdOrFail(id);
    Object.assign(subject, reqDto);
    return this.repository.save(subject);
  }

  async getAll(): Promise<QuestionTypeEntity[]> {
    return this.repository.find();
  }

  async getOneByIdOrFail(id: number): Promise<QuestionTypeEntity> {
    return this.repository.findOneByOrFail({ id });
  }

  async getOneById(id: number): Promise<QuestionTypeEntity> {
    return this.repository.findOneBy({ id });
  }

  async isNameExist(name: string, id?: number): Promise<boolean> {
    const query = new QuestionTypeEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    const isExist: QuestionTypeEntity = await this.repository.findOneBy(query);
    return !!isExist;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

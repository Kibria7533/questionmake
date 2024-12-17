import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamEntity } from "../entities/exam.entity";
import { ExamCategoryEntity } from "../entities/exam-category.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class ExamRepository extends Repository<ExamEntity> {
  constructor(@InjectRepository(ExamEntity) repository: Repository<ExamEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(): Promise<ExamEntity[]> {
    return this.find();
  }

  async getOneById(id: string): Promise<ExamEntity> {
    return this.findOne({ where: { _id: new ObjectId(id) } });
  }

  async getOneByIdOrFail(id: string): Promise<ExamEntity> {
    return this.findOneOrFail({ where: { _id: new ObjectId(id) } });
  }
}

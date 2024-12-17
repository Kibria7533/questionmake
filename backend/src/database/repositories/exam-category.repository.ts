import { Repository, Not } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamCategoryEntity } from "../entities/exam-category.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class ExamCategoryRepository extends Repository<ExamCategoryEntity> {
  constructor(@InjectRepository(ExamCategoryEntity) repository: Repository<ExamCategoryEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(): Promise<ExamCategoryEntity[]> {
    return this.find();
  }

  async getOneById(id: string): Promise<ExamCategoryEntity> {
    return this.findOne({ where: { _id: new ObjectId(id) } });
  }

  async getOneWithExams(id: string): Promise<ExamCategoryEntity> {
    return this.findOne({ where: { _id: new ObjectId(id) }, relations: ["exams"] });
  }

  async isCategoryNameExist(name: string, id?: string): Promise<ExamCategoryEntity> {
    const query: ExamCategoryEntity = new ExamCategoryEntity();
    query.name = name;
    if (id) {
      query._id = { $ne: new ObjectId(id) } as any;
    }
    return this.findOne({ where: query });
  }

  async getOneByIdOrFail(id: string): Promise<ExamCategoryEntity> {
    return this.findOneOrFail({ where: { _id: new ObjectId(id) } });
  }
}

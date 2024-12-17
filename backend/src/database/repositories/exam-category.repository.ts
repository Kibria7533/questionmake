import { Not, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamCategoryEntity } from "../entities/exam-category.entity";

@Injectable()
export class ExamCategoryRepository extends Repository<ExamCategoryEntity> {
  constructor(@InjectRepository(ExamCategoryEntity) repository: Repository<ExamCategoryEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(): Promise<ExamCategoryEntity[]> {
    return this.find();
  }

  async getOneById(id: number): Promise<ExamCategoryEntity> {
    return this.findOne({ where: { id } });
  }

  async getOneWithExams(id: number): Promise<ExamCategoryEntity> {
    return this.findOne({ where: { id }, relations: ["exams"] });
  }

  async isCategoryNameExist(name: string, id?: number): Promise<ExamCategoryEntity> {
    const query: ExamCategoryEntity = new ExamCategoryEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    return this.findOne({ where: query });
  }

  async getOneByIdOrFail(id: number): Promise<ExamCategoryEntity> {
    return this.findOneOrFail({ where: { id } });
  }
}

import { Not, Repository, SelectQueryBuilder } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamCategoryEntity } from "../entities/exam-category.entity";
import { BooleanStatus } from "../../config/enum";
import { FilterExamCategoryDto } from "../../modules/exam-category/dto/filter-exam-category.dto";

@Injectable()
export class ExamCategoryRepository extends Repository<ExamCategoryEntity> {
  constructor(@InjectRepository(ExamCategoryEntity) repository: Repository<ExamCategoryEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  // Get all exam categories
  async getAll(reqDto: FilterExamCategoryDto): Promise<ExamCategoryEntity[]> {
    const builder: SelectQueryBuilder<ExamCategoryEntity> = this.createQueryBuilder("category");

    if (reqDto?.is_popular == BooleanStatus.YES) {
      builder.andWhere("category.is_popular = :is_popular", { is_popular: BooleanStatus.YES });
    } else if (reqDto?.is_popular == BooleanStatus.NO) {
      builder.andWhere("category.is_popular = :is_popular", { is_popular: BooleanStatus.NO });
    }

    return builder.getMany();
  }

  // Get all exam categories
  async getPopularList(): Promise<ExamCategoryEntity[]> {
    return this.find({ where: { is_popular: BooleanStatus.YES } });
  }

  // Get one exam category by ID
  async getOneById(id: number): Promise<ExamCategoryEntity> {
    return this.findOne({ where: { id } });
  }

  // Get one exam category by ID with exams
  async getOneWithExams(id: number): Promise<ExamCategoryEntity> {
    return this.findOne({ where: { id }, relations: ["exams"] });
  }

  // Get all exam categories with exams
  async getAllWithExams(): Promise<ExamCategoryEntity[]> {
    return this.find({ relations: ["exams"] }); // Fetch all with relations
  }

  // Check if category name exists
  async isCategoryNameExist(name: string, id?: number): Promise<ExamCategoryEntity> {
    const query: ExamCategoryEntity = new ExamCategoryEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    return this.findOne({ where: query });
  }

  // Get one exam category by ID or throw an error
  async getOneByIdOrFail(id: number): Promise<ExamCategoryEntity> {
    return this.findOneOrFail({ where: { id } });
  }
}

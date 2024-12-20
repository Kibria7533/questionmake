import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateExamCategoryDto } from "./dto/update-exam-category.dto";
import { ExamCategoryEntity } from "../../database/entities/exam-category.entity";
import { CreateExamCategoryDto } from "./dto/create-exam-category.dto";
import { ExamCategoryRepository } from "../../database/repositories/exam-category.repository";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { ExamCategoryWithExamsDto } from "./dto/exam-with-category.dto";

@Injectable()
export class ExamCategoryService {
  @Inject()
  private readonly repository: ExamCategoryRepository;

  async create(reqDto: CreateExamCategoryDto): Promise<ExamCategoryEntity> {
    if (await this.isCategoryNameExist(reqDto.name)) {
      throw new BadRequestException("Category already exist");
    }

    const category: ExamCategoryEntity = this.repository.create(reqDto);
    return this.repository.save(category);
  }

  async update(id: number, reqDto: UpdateExamCategoryDto): Promise<ExamCategoryEntity> {
    if (await this.isCategoryNameExist(reqDto.name, id)) {
      throw new BadRequestException("Category already exist");
    }

    const category: ExamCategoryEntity = await this.getOneByIdOrFail(id);
    Object.assign(category, reqDto);
    return this.repository.save(category);
  }

  async getAll(): Promise<ExamCategoryEntity[]> {
    return this.repository.getAll();
  }

  async getOneByIdOrFail(id: number): Promise<ExamCategoryEntity> {
    return this.repository.getOneByIdOrFail(id);
  }

  async getOneById(id: number): Promise<ExamCategoryEntity> {
    return this.repository.getOneById(id);
  }

  async getOneWithExams(id: number): Promise<ExamCategoryEntity> {
    return this.repository.getOneWithExams(id);
  }

  async isCategoryNameExist(name: string, id?: number): Promise<boolean> {
    const isExist: ExamCategoryEntity = await this.repository.isCategoryNameExist(name, id);
    console.log(isExist);
    return !!isExist;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
  
  async getAllCategoriesWithExams(): Promise<ExamCategoryWithExamsDto[]> {
    const categories = await this.repository.getAllWithExams();
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      exams: category.exams.map(exam => ({
        id: exam.id,
        name: exam.name,
      })),
    }));
  }
  
  
}

import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { ExamCategoryService } from "./exam-category.service";
import { PublicBaseController } from "../../guards/public.base.controller";
import { UpdateExamCategoryDto } from "./dto/update-exam-category.dto";
import { ExamCategoryEntity } from "../../database/entities/exam-category.entity";
import { CreateExamCategoryDto } from "./dto/create-exam-category.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { ExamCategoryWithExamsDto } from "./dto/exam-with-category.dto";
import { FilterExamCategoryDto } from "./dto/filter-exam-category.dto";

@Controller("exam-category")
export class ExamCategoryController extends PublicBaseController {
  @Inject()
  private readonly service: ExamCategoryService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateExamCategoryDto): Promise<ExamCategoryEntity> {
    console.log("reqDto-------------------", reqDto);
    return this.service.create(reqDto);
  }

  @Put(":id")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateExamCategoryDto): Promise<ExamCategoryEntity> {
    return this.service.update(id, reqDto);
  }

  @Get()
  async getAll(@Query() reqDto: FilterExamCategoryDto): Promise<ExamCategoryEntity[]> {
    return this.service.getAll(reqDto);
  }

  @Get("/exam-with-categories")
  async getAllCategoriesWithExams(): Promise<ExamCategoryWithExamsDto[]> {
    return this.service.getAllCategoriesWithExams();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<ExamCategoryEntity> {
    return this.service.getOneById(id);
  }

  @Get(":id/exams")
  async getOneWithExams(@Param("id", ParseIntPipe) id: number): Promise<ExamCategoryEntity> {
    return this.service.getOneWithExams(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}

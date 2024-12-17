import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateExamDto } from "./dto/create-exam.dto";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { ExamService } from "./exam.service";
import { PublicBaseController } from "../../guards/public.base.controller";
import { ExamEntity } from "../../database/entities/exam.entity";
import { UpdateExamDto } from "./dto/update-exam.dto";
import { ExamCategoryEntity } from "../../database/entities/exam-category.entity";

@Controller("exam")
export class ExamController extends PublicBaseController {
  @Inject()
  private readonly service: ExamService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateExamDto): Promise<ExamEntity> {
    return this.service.create(reqDto);
  }

  @Put(":id")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateExamDto): Promise<ExamEntity> {
    return this.service.update(id, reqDto);
  }

  @Get()
  async getAll(): Promise<ExamEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<ExamEntity> {
    return this.service.getOneById(id);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<ExamCategoryEntity> {
    return this.service.delete(id);
  }
}

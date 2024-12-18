import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { QuestionTypeService } from "./question-type.service";
import { UpdateQuestionTypeDto } from "./dto/update-question-type.dto";
import { CreateQuestionTypeDto } from "./dto/create-question-type.dto";
import { PrivateBaseController } from "../../guards/private.base.controller";
import { QuestionTypeEntity } from "../../database/entities/question-type.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";

@Controller("question-types")
export class QuestionTypeController extends PrivateBaseController {
  @Inject()
  private readonly service: QuestionTypeService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateQuestionTypeDto): Promise<QuestionTypeEntity> {
    return this.service.create(reqDto);
  }

  @Put(":id")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateQuestionTypeDto): Promise<QuestionTypeEntity> {
    return this.service.update(id, reqDto);
  }

  @Get()
  async getAll(): Promise<QuestionTypeEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<QuestionTypeEntity> {
    return this.service.getOneById(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}

import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { SubjectService } from "./subject.service";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { PrivateBaseController } from "../../guards/private.base.controller";
import { SubjectEntity } from "../../database/entities/subject.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { HasPermission } from "../../config/meta.data";
import { Permissions } from "../../config/permissions";

@Controller("subjects")
export class SubjectController extends PrivateBaseController {
  @Inject()
  private readonly service: SubjectService;

  @Post()
  @HasPermission([Permissions.CREATE_UPDATE_SUBJECT])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateSubjectDto): Promise<SubjectEntity> {
    return this.service.create(reqDto);
  }

  @Put(":id")
  @HasPermission([Permissions.CREATE_UPDATE_SUBJECT])
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateSubjectDto): Promise<SubjectEntity> {
    return this.service.update(id, reqDto);
  }

  @Get()
  @HasPermission([Permissions.GET_SUBJECT])
  async getAll(): Promise<SubjectEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  @HasPermission([Permissions.GET_SUBJECT])
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<SubjectEntity> {
    return this.service.getOneById(id);
  }

  @Delete(":id")
  @HasPermission([Permissions.DELETE_SUBJECT])
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}

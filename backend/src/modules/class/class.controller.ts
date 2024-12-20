import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { ClassService } from "./class.service";
import { UpdateClassDto } from "./dto/update-class.dto";
import { CreateClassDto } from "./dto/create-class.dto";
import { PrivateBaseController } from "../../guards/private.base.controller";
import { ClassEntity } from "../../database/entities/class.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";

@Controller("classes")
export class ClassController extends PrivateBaseController {
  @Inject()
  private readonly service: ClassService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateClassDto): Promise<ClassEntity> {
    return this.service.create(reqDto);
  }

  @Put(":id")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateClassDto): Promise<ClassEntity> {
    return this.service.update(id, reqDto);
  }

  @Get()
  async getAll(): Promise<ClassEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<ClassEntity> {
    return this.service.getOneById(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}

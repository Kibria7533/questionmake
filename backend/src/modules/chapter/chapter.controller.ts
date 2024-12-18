import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { ChapterService } from "./chapter.service";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { PrivateBaseController } from "../../guards/private.base.controller";
import { ChapterEntity } from "../../database/entities/chapter.entity";

@Controller("chapters")
export class ChapterController extends PrivateBaseController {
  @Inject()
  private readonly service: ChapterService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateChapterDto): Promise<ChapterEntity> {
    return this.service.create(reqDto);
  }

  @Put(":id")
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async update(@Param("id", ParseIntPipe) id: number, @Body() reqDto: UpdateChapterDto): Promise<ChapterEntity> {
    return this.service.update(id, reqDto);
  }

  @Get()
  async getAll(): Promise<ChapterEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<ChapterEntity> {
    return this.service.getOneById(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ChapterEntity> {
    return this.service.delete(id);
  }
}

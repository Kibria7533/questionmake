import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { Not } from "typeorm";
import { ChapterEntity } from "../../database/entities/chapter.entity";
import { ChapterRepository } from "../../database/repositories/chapter.repository";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";

@Injectable()
export class ChapterService {
  @Inject()
  private readonly repository: ChapterRepository;

  async create(reqDto: CreateChapterDto): Promise<ChapterEntity> {
    if (await this.isNameExist(reqDto.name)) {
      throw new BadRequestException("Chapter already exist");
    }

    const subject: ChapterEntity = this.repository.create(reqDto);
    return this.repository.save(subject);
  }

  async update(id: number, reqDto: UpdateChapterDto): Promise<ChapterEntity> {
    if (await this.isNameExist(reqDto.name, id)) {
      throw new BadRequestException("Chapter already exist");
    }

    const subject: ChapterEntity = await this.getOneByIdOrFail(id);
    Object.assign(subject, reqDto);
    return this.repository.save(subject);
  }

  async getAll(): Promise<ChapterEntity[]> {
    return this.repository.find();
  }

  async getOneByIdOrFail(id: number): Promise<ChapterEntity> {
    return this.repository.findOneByOrFail({ id });
  }

  async getOneById(id: number): Promise<ChapterEntity> {
    return this.repository.findOneBy({ id });
  }

  async isNameExist(name: string, id?: number): Promise<boolean> {
    const query = new ChapterEntity();
    query.name = name;
    if (id) {
      query.id = Not(id) as any;
    }
    const isExist: ChapterEntity = await this.repository.findOneBy(query);
    return !!isExist;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

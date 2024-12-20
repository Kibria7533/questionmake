import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChapterEntity } from "../entities/chapter.entity";

@Injectable()
export class ChapterRepository extends Repository<ChapterEntity> {
  constructor(@InjectRepository(ChapterEntity) repository: Repository<ChapterEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

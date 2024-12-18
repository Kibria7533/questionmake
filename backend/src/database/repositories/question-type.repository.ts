import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionTypeEntity } from "../entities/question-type.entity";

@Injectable()
export class QuestionTypeRepository extends Repository<QuestionTypeEntity> {
  constructor(@InjectRepository(QuestionTypeEntity) repository: Repository<QuestionTypeEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

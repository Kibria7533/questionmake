import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectEntity } from "../entities/subject.entity";

@Injectable()
export class SubjectRepository extends Repository<SubjectEntity> {
  constructor(@InjectRepository(SubjectEntity) repository: Repository<SubjectEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

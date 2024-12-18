import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";
import { SubjectEntity } from "../../database/entities/subject.entity";
import { SubjectRepository } from "../../database/repositories/subject.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository],
  exports: [SubjectService],
})
export class SubjectModule {}

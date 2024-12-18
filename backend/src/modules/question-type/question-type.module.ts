import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionTypeController } from "./question-type.controller";
import { QuestionTypeService } from "./question-type.service";
import { QuestionTypeRepository } from "../../database/repositories/question-type.repository";
import { QuestionTypeEntity } from "../../database/entities/question-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionTypeEntity])],
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService, QuestionTypeRepository],
  exports: [QuestionTypeService],
})
export class QuestionTypeModule {}

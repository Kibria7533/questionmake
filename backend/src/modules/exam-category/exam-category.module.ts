import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExamCategoryController } from "./exam-category.controller";
import { ExamCategoryService } from "./exam-category.service";
import { ExamCategoryEntity } from "../../database/entities/exam-category.entity";
import { ExamCategoryRepository } from "../../database/repositories/exam-category.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ExamCategoryEntity])],
  controllers: [ExamCategoryController],
  providers: [ExamCategoryService, ExamCategoryRepository],
  exports: [ExamCategoryService],
})
export class ExamCategoryModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { ExamEntity } from "../../database/entities/exam.entity";
import { ExamRepository } from "../../database/repositories/exam.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [ExamController],
  providers: [ExamService, ExamRepository],
  exports: [ExamService],
})
export class ExamModule {}

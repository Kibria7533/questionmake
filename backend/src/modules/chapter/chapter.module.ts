import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChapterController } from "./chapter.controller";
import { ChapterService } from "./chapter.service";
import { ChapterRepository } from "../../database/repositories/chapter.repository";
import { ChapterEntity } from "../../database/entities/chapter.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository],
  exports: [ChapterService],
})
export class ChapterModule {}

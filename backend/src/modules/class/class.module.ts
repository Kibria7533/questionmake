import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { ClassRepository } from "../../database/repositories/class.repository";
import { ClassEntity } from "../../database/entities/class.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
  exports: [ClassService],
})
export class ClassModule {}

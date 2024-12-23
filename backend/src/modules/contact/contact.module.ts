import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ContactRepository } from "../../database/repositories/contact.repository";
import { ContactEntity } from "../../database/entities/contact.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
  exports: [ContactService],
})
export class ContactModule {}

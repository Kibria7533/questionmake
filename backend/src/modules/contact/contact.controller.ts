import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiConsumes, ApiProduces } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { PublicBaseController } from "../../guards/public.base.controller";
import { ContactEntity } from "../../database/entities/contact.entity";

@Controller("contact")
export class ContactController extends PublicBaseController {
  @Inject()
  private readonly service: ContactService;

  @Post()
  @ApiConsumes("application/json", `application/x-www-form-urlencoded`)
  @ApiProduces("application/json")
  async create(@Body() reqDto: CreateContactDto): Promise<ContactEntity> {
    return this.service.create(reqDto);
  }

  @Get()
  async getAll(): Promise<ContactEntity[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<ContactEntity> {
    return this.service.getOneById(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}

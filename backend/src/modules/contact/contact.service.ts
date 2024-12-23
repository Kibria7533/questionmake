import { Inject, Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { ContactEntity } from "../../database/entities/contact.entity";
import { ContactRepository } from "../../database/repositories/contact.repository";

@Injectable()
export class ContactService {
  @Inject()
  private readonly repository: ContactRepository;

  async create(reqDto: CreateContactDto): Promise<ContactEntity> {
    const result: ContactEntity = this.repository.create(reqDto);
    return this.repository.save(result);
  }

  async getAll(): Promise<ContactEntity[]> {
    return this.repository.find();
  }

  async getOneById(id: number): Promise<ContactEntity> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

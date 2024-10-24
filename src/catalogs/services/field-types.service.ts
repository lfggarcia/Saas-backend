import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldType } from '../entities/field-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldTypesService {
  constructor(
    @InjectRepository(FieldType)
    private fieldTypesRepository: Repository<FieldType>,
  ) {}

  findAll(): Promise<FieldType[]> {
    return this.fieldTypesRepository.find();
  }

  findOne(id: string): Promise<FieldType> {
    return this.fieldTypesRepository.findOne({ where: { id } });
  }

  create(fieldType: Partial<FieldType>): Promise<FieldType> {
    const newFieldType = this.fieldTypesRepository.create(fieldType);
    return this.fieldTypesRepository.save(newFieldType);
  }

  async update(id: string, fieldType: Partial<FieldType>): Promise<FieldType> {
    await this.fieldTypesRepository.update(id, fieldType);
    return this.fieldTypesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.fieldTypesRepository.delete(id);
  }
}

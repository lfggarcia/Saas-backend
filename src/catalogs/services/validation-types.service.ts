import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationType } from '../entities/validation-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValidationTypesService {
  constructor(
    @InjectRepository(ValidationType)
    private validationTypesRepository: Repository<ValidationType>,
  ) {}

  findAll(): Promise<ValidationType[]> {
    return this.validationTypesRepository.find();
  }

  findOne(id: string): Promise<ValidationType> {
    return this.validationTypesRepository.findOne({ where: { id } });
  }

  create(validationType: Partial<ValidationType>): Promise<ValidationType> {
    const newValidationType = this.validationTypesRepository.create(validationType);
    return this.validationTypesRepository.save(newValidationType);
  }

  async update(id: string, validationType: Partial<ValidationType>): Promise<ValidationType> {
    await this.validationTypesRepository.update(id, validationType);
    return this.validationTypesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.validationTypesRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TranslationValues } from '../entities';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TranslationValues)
    private aliasesRepository: Repository<TranslationValues>,
  ) {}

  async findAll() {
    return this.aliasesRepository.find();
  }
}

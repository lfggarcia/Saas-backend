import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Users)
    private aliasesRepository: Repository<Users>,
  ) {}

  async findAll() {
    return this.aliasesRepository.find();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alias } from '../entities/alias.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AliasesService {
  constructor(
    @InjectRepository(Alias)
    private aliasesRepository: Repository<Alias>,
  ) {}

  findAll(): Promise<Alias[]> {
    return this.aliasesRepository.find();
  }

  findOne(id: string): Promise<Alias> {
    return this.aliasesRepository.findOne({ where: { id } });
  }

  create(alias: Partial<Alias>): Promise<Alias> {
    const newAlias = this.aliasesRepository.create(alias);
    return this.aliasesRepository.save(newAlias);
  }

  async update(id: string, alias: Partial<Alias>): Promise<Alias> {
    await this.aliasesRepository.update(id, alias);
    return this.aliasesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.aliasesRepository.delete(id);
  }
}

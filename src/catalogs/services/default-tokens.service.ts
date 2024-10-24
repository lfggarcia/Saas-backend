import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultToken } from '../entities/default-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DefaultTokensService {
  constructor(
    @InjectRepository(DefaultToken)
    private defaultTokensRepository: Repository<DefaultToken>,
  ) {}

  findAll(): Promise<DefaultToken[]> {
    return this.defaultTokensRepository.find({ relations: ['tokenGroup'] });
  }

  findOne(id: string): Promise<DefaultToken> {
    return this.defaultTokensRepository.findOne({
      where: { id },
      relations: ['tokenGroup'],
    });
  }

  create(defaultToken: Partial<DefaultToken>): Promise<DefaultToken> {
    const newDefaultToken = this.defaultTokensRepository.create(defaultToken);
    return this.defaultTokensRepository.save(newDefaultToken);
  }

  async update(id: string, defaultToken: Partial<DefaultToken>): Promise<DefaultToken> {
    await this.defaultTokensRepository.update(id, defaultToken);
    return this.defaultTokensRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.defaultTokensRepository.delete(id);
  }
}

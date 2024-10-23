import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenGroup } from '../entities/token-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenGroupsService {
  constructor(
    @InjectRepository(TokenGroup)
    private tokenGroupsRepository: Repository<TokenGroup>,
  ) {}

  findAll(): Promise<TokenGroup[]> {
    return this.tokenGroupsRepository.find();
  }

  findOne(id: string): Promise<TokenGroup> {
    return this.tokenGroupsRepository.findOne({ where: { id } });
  }

  create(tokenGroup: Partial<TokenGroup>): Promise<TokenGroup> {
    const newTokenGroup = this.tokenGroupsRepository.create(tokenGroup);
    return this.tokenGroupsRepository.save(newTokenGroup);
  }

  async update(id: string, tokenGroup: Partial<TokenGroup>): Promise<TokenGroup> {
    await this.tokenGroupsRepository.update(id, tokenGroup);
    return this.tokenGroupsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.tokenGroupsRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusesRepository: Repository<Status>,
  ) {}

  findAll(): Promise<Status[]> {
    return this.statusesRepository.find();
  }

  findOne(id: string): Promise<Status> {
    return this.statusesRepository.findOne({ where: { id } });
  }

  create(status: Partial<Status>): Promise<Status> {
    const newStatus = this.statusesRepository.create(status);
    return this.statusesRepository.save(newStatus);
  }

  async update(id: string, status: Partial<Status>): Promise<Status> {
    await this.statusesRepository.update(id, status);
    return this.statusesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.statusesRepository.delete(id);
  }
}

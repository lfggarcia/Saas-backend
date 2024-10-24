import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOne({ where: { id } });
  }

  create(role: Partial<Role>): Promise<Role> {
    const newRole = this.rolesRepository.create(role);
    return this.rolesRepository.save(newRole);
  }

  async update(id: string, role: Partial<Role>): Promise<Role> {
    await this.rolesRepository.update(id, role);
    return this.rolesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}

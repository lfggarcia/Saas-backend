import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../../entities';
import { BaseService } from '../../common/base.service';

@Injectable()
export class RolesService {
	private baseService: BaseService<Roles>;

	constructor(
		@InjectRepository(Roles)
		private readonly rolesRepository: Repository<Roles>,
	) {
		this.baseService = new BaseService(this.rolesRepository);
	}

  create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto);
		return this.rolesRepository.save(role);
  }

  findAll(query: Partial<CreateRoleDto>) {
		const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<Roles> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.rolesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({
			where: { id }
		});
		if (!role) {
			throw new NotFoundException(`Role with ID ${id} does not exist.`);
		}
		const updatedRole = this.rolesRepository.merge(role, updateRoleDto);
		return this.rolesRepository.save(updatedRole);
  }

  async remove(id: string) {
    const role = await this.rolesRepository.findOne({
			where: { id }
		});
		if (!role) {
			throw new NotFoundException(`Role with ID ${id} does not exist.`);
		}
		return this.rolesRepository.remove(role);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorRoleDto } from './dto/create-collaborator-role.dto';
import { UpdateCollaboratorRoleDto } from './dto/update-collaborator-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollaboratorRoles } from '../../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class CollaboratorRolesService {
	private baseService: BaseService<CollaboratorRoles>;

	constructor(
		@InjectRepository(CollaboratorRoles)
		private readonly collaboratorRoleRepository: Repository<CollaboratorRoles>,
	) {
		this.baseService = new BaseService(this.collaboratorRoleRepository);
	}

  create(createCollaboratorRoleDto: CreateCollaboratorRoleDto) {
    const collaboratorRole = this.collaboratorRoleRepository.create(createCollaboratorRoleDto);
		return this.collaboratorRoleRepository.save(collaboratorRole);
  }

  findAll(query: Partial<CreateCollaboratorRoleDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<CollaboratorRoles> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.collaboratorRoleRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCollaboratorRoleDto: UpdateCollaboratorRoleDto) {
    const collaboratorRole = await this.collaboratorRoleRepository.findOne({
			where: { id }
		});
		if (!collaboratorRole) {
			throw new NotFoundException(`CollaboratorRole with ID ${id} does not exist.`);
		}
		const updatedCollaboratorRole = this.collaboratorRoleRepository.merge(collaboratorRole, updateCollaboratorRoleDto);
		return this.collaboratorRoleRepository.save(updatedCollaboratorRole);
  }

  async remove(id: string) {
    const collaboratorRole = await this.collaboratorRoleRepository.findOne({
			where: { id }
		});
		if (!collaboratorRole) {
			throw new NotFoundException(`CollaboratorRole with ID ${id} does not exist.`);
		}
		return this.collaboratorRoleRepository.remove(collaboratorRole);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppCollaboratorPermissionDto } from './dto/create-app-collaborator-permission.dto';
import { UpdateAppCollaboratorPermissionDto } from './dto/update-app-collaborator-permission.dto';
import { BaseService } from '../../common/base.service';
import { AppCollaboratorPermissions } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Not, Repository } from 'typeorm';
import { AppCollaboratorsService } from '../app-collaborators/app-collaborators.service';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class AppCollaboratorPermissionsService {
	private baseService: BaseService<AppCollaboratorPermissions>;

	constructor(
		@InjectRepository(AppCollaboratorPermissions)
		private readonly appCollaboratorPermissionsRepository: Repository<AppCollaboratorPermissions>,
		private readonly appCollaboratorsService: AppCollaboratorsService,
		private readonly PermissionsService: PermissionsService
	) {
		this.baseService = new BaseService<AppCollaboratorPermissions>(this.appCollaboratorPermissionsRepository);
	}

  async create(createAppCollaboratorPermissionDto: CreateAppCollaboratorPermissionDto) {
    const {
			collaboratorId,
			permissionId
		} = createAppCollaboratorPermissionDto;

		const newAppCollaboratorPermission: DeepPartial<AppCollaboratorPermissions> = {}

		if (!collaboratorId) {
			throw new NotFoundException('Collaborator is required');
		}
		const collaborator = await this.appCollaboratorsService.findOne(collaboratorId);
		if (!collaborator) {
			throw new NotFoundException('Collaborator not found');
		}
		newAppCollaboratorPermission.collaborator = collaborator;

		if (!permissionId) {
			throw new NotFoundException('Permission is required');
		}
		const permission = await this.PermissionsService.findOne(permissionId);
		if (!permission) {
			throw new NotFoundException('Permission not found');
		}
		newAppCollaboratorPermission.permission = permission;

		const existingAppCollaboratorPermission = await this.appCollaboratorPermissionsRepository.findOne({
			where: {
				collaborator: {
					id: collaboratorId
				},
				permission: {
					id: permissionId
				}
			}
		});
		if (existingAppCollaboratorPermission) {
			throw new NotFoundException('AppCollaboratorPermission already exists');
		}
		const appCollaboratorPermission = this.appCollaboratorPermissionsRepository.create(newAppCollaboratorPermission);
		await this.appCollaboratorPermissionsRepository.save(appCollaboratorPermission);
		return appCollaboratorPermission;
  }

  findAll(query: Partial<CreateAppCollaboratorPermissionDto>) {
    const buildFilters = (q: Partial<CreateAppCollaboratorPermissionDto & FindOptionsWhere<AppCollaboratorPermissions>>) => {
			const filters: FindOptionsWhere<AppCollaboratorPermissions> = {};
			if (q.id) filters.id = q.id;
			if (q.collaboratorId) filters.collaborator = { id: q.collaboratorId };
			if (q.permissionId) filters.permission = { id: q.permissionId };
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.appCollaboratorPermissionsRepository.findOne({ where: { id }});
  }

  async update(id: string, updateAppCollaboratorPermissionDto: UpdateAppCollaboratorPermissionDto) {
    const {
			collaboratorId,
			permissionId
		} = updateAppCollaboratorPermissionDto;

		const updateAppCollaboratorPermission: DeepPartial<AppCollaboratorPermissions> = {}

		if (!collaboratorId) {
			throw new NotFoundException('Collaborator is required');
		}
		const collaborator = await this.appCollaboratorsService.findOne(collaboratorId);
		if (!collaborator) {
			throw new NotFoundException('Collaborator not found');
		}
		updateAppCollaboratorPermission.collaborator = collaborator;
		if (!permissionId) {
			throw new NotFoundException('Permission is required');
		}
		const permission = await this.PermissionsService.findOne(permissionId);
		if (!permission) {
			throw new NotFoundException('Permission not found');
		}
		updateAppCollaboratorPermission.permission = permission;
		const existingAppCollaboratorPermission = await this.appCollaboratorPermissionsRepository.findOne({
			where: {
				id: Not(id),
				collaborator: {
					id: collaboratorId
				},
				permission: {
					id: permissionId
				}
			}
		});
		if (existingAppCollaboratorPermission) {
			throw new NotFoundException('AppCollaboratorPermission already exists');
		}
		const appCollaboratorPermission = await this.appCollaboratorPermissionsRepository.findOne({
			where: { id }
		});
		if (!appCollaboratorPermission) {
			throw new NotFoundException(`AppCollaboratorPermission with ID ${id} does not exist.`);
		}
		const updatedAppCollaboratorPermission = this.appCollaboratorPermissionsRepository.merge(appCollaboratorPermission, updateAppCollaboratorPermission);
		return this.appCollaboratorPermissionsRepository.save(updatedAppCollaboratorPermission);
  }

  async remove(id: string) {
    const appCollaboratorPermission = await this.appCollaboratorPermissionsRepository.findOne({
			where: { id }
		});
		if (!appCollaboratorPermission) {
			throw new NotFoundException(`AppCollaboratorPermission with ID ${id} does not exist.`);
		}
		return this.appCollaboratorPermissionsRepository.remove(appCollaboratorPermission);
  }
}

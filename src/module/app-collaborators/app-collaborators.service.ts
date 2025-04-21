import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppCollaboratorDto } from './dto/create-app-collaborator.dto';
import { UpdateAppCollaboratorDto } from './dto/update-app-collaborator.dto';
import { BaseService } from '../../common/base.service';
import { AppCollaborators } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Not, Repository } from 'typeorm';
import { AppsService } from '../apps/apps.service';
import { UsersService } from '../users/users.service';
import { CollaboratorRolesService } from '../collaborator-roles/collaborator-roles.service';

@Injectable()
export class AppCollaboratorsService {
	private baseService: BaseService<AppCollaborators>;

	constructor(
		@InjectRepository(AppCollaborators)
		private readonly appCollaboratorsRepository: Repository<AppCollaborators>,
		private readonly appsService: AppsService,
		private readonly usersService: UsersService,
		private readonly collaboratorRolesService: CollaboratorRolesService
	) {
		this.baseService = new BaseService<AppCollaborators>(this.appCollaboratorsRepository);
	}

  async create(createAppCollaboratorDto: CreateAppCollaboratorDto) {
    const {
			appId,
			userId,
			roleId
		} = createAppCollaboratorDto
		const newAppCollaboratorData:DeepPartial<AppCollaborators> = {}

		if (!appId) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		const app = await this.appsService.findOne(appId);
		if (!app) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		newAppCollaboratorData.app = app;

		if (!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		newAppCollaboratorData.user = user;

		if (!roleId) {
			throw new NotFoundException(`Role with ID ${roleId} does not exist.`);
		}
		const role = await this.collaboratorRolesService.findOne(roleId);
		if (!role) {
			throw new NotFoundException(`Role with ID ${roleId} does not exist.`);
		}
		newAppCollaboratorData.role = role;
		const existingCollaborator = await this.appCollaboratorsRepository.findOne({
			where: {
				app: { id: appId },
				user: { id: userId },
				role: { id: Not(roleId) }
			}
		});
		if (existingCollaborator) {
			throw new NotFoundException(`Collaborator with ID ${userId} already exists in app ${appId} with a different role.`);
		}
		const appCollaborator = this.appCollaboratorsRepository.create(newAppCollaboratorData);
		return this.appCollaboratorsRepository.save(appCollaborator);
  }

  findAll(query: Partial<CreateAppCollaboratorDto>) {
    const buildFilters = (q: Partial<CreateAppCollaboratorDto & FindOptionsWhere<AppCollaborators>>) => {
			const filters: FindOptionsWhere<AppCollaborators> = {};
			if (q.id) filters.id = q.id;
			if (q.appId) filters.app = { id: q.appId };
			if (q.userId) filters.user = { id: q.userId };
			if (q.roleId) filters.role = { id: q.roleId };
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.appCollaboratorsRepository.findOne({ where: { id }});
  }

  async update(id: string, updateAppCollaboratorDto: UpdateAppCollaboratorDto) {
		const {appId,roleId,userId} = updateAppCollaboratorDto
		const updateAppCollaboratorData:DeepPartial<AppCollaborators> = {}
		if (!appId) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		const app = await this.appsService.findOne(appId);
		if (!app) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		updateAppCollaboratorData.app = app;

		if (!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		updateAppCollaboratorData.user = user;

		if (!roleId) {
			throw new NotFoundException(`Role with ID ${roleId} does not exist.`);
		}
		const role = await this.collaboratorRolesService.findOne(roleId);
		if (!role) {
			throw new NotFoundException(`Role with ID ${roleId} does not exist.`);
		}
		updateAppCollaboratorData.role = role;
		const existingCollaborator = await this.appCollaboratorsRepository.findOne({
			where: {
				app: { id: appId },
				user: { id: userId },
				role: { id: Not(roleId) }
			}
		});
		if (existingCollaborator) {
			throw new NotFoundException(`Collaborator with ID ${userId} already exists in app ${appId} with a different role.`);
		}
		const appCollaborator = await this.appCollaboratorsRepository.findOne({
			where: { id }
		});
		if (!appCollaborator) {
			throw new NotFoundException(`AppCollaborator with ID ${id} does not exist.`);
		}
		const updatedAppCollaborator = this.appCollaboratorsRepository.merge(appCollaborator, updateAppCollaboratorData);
		return this.appCollaboratorsRepository.save(updatedAppCollaborator);
  }

  async remove(id: string) {
		const appCollaborator = await this.appCollaboratorsRepository.findOne({
			where: { id }
		});
		if (!appCollaborator) {
			throw new NotFoundException(`AppCollaborator with ID ${id} does not exist.`);
		}
		return this.appCollaboratorsRepository.remove(appCollaborator);
  }
}

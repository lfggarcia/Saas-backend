import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseService } from '../../common/base.service';
import { Permissions } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { PermissionTypeCatalogService } from '../permission_type_catalog/permission_type_catalog.service';

@Injectable()
export class PermissionsService {
	private baseService: BaseService<Permissions>;

	constructor(
		@InjectRepository(Permissions)
		private readonly permissionsRepository: Repository<Permissions>,
		private readonly permissionTypeCatalogService: PermissionTypeCatalogService
	){
		this.baseService = new BaseService(this.permissionsRepository);
	}

  async create(createPermissionDto: CreatePermissionDto) {
    const {typeId,...data} = createPermissionDto;
		const createPermissionData:DeepPartial<Permissions> = {
			...data
		}

		if (!typeId) {
			throw new NotFoundException(`Permission Type with ID ${typeId} does not exist.`);
		}

		const permissionType = await this.permissionTypeCatalogService.findOne(typeId);
		if (!permissionType) {
			throw new NotFoundException(`Permission Type with ID ${typeId} does not exist.`);
		}
		createPermissionData.type = permissionType;
		const permission = this.permissionsRepository.create(createPermissionData);
		return this.permissionsRepository.save(permission);
  }

  findAll(query: Partial<CreatePermissionDto>) {
		const buildFilters = (q: Partial<CreatePermissionDto & FindOptionsWhere<Permissions>>) => {
			const filters: FindOptionsWhere<Permissions> = {};
			if (q.id) filters.id = q.id;
			if (q.key) filters.key = q.key;
			if (q.label) filters.label = q.label;
			if (q.description) filters.description = q.description;
			if (q.typeId) filters.type = { id: q.typeId };
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.permissionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const {typeId,...data} = updatePermissionDto;
		const updatePermissionData:DeepPartial<Permissions> = {
			...data
		}

		if (!typeId) {
			throw new NotFoundException(`Permission Type with ID ${typeId} does not exist.`);
		}
		const permissionType = await this.permissionTypeCatalogService.findOne(typeId);
		if (!permissionType) {
			throw new NotFoundException(`Permission Type with ID ${typeId} does not exist.`);
		}
		updatePermissionData.type = permissionType;
		const permission = await this.permissionsRepository.findOne({
			where: { id },
		});
		if (!permission) {
			throw new NotFoundException(`Permission with ID ${id} does not exist.`);
		}
		const updatedPermission = this.permissionsRepository.merge(permission, updatePermissionData);
		return this.permissionsRepository.save(updatedPermission);
  }

  async remove(id: string) {
		const permission = await this.permissionsRepository.findOne({
			where: { id },
		});
		if (!permission) {
			throw new NotFoundException(`Permission with ID ${id} does not exist.`);
		}
		return this.permissionsRepository.remove(permission);
  }
}

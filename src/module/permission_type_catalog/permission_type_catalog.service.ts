import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionTypeCatalogDto } from './dto/create-permission_type_catalog.dto';
import { UpdatePermissionTypeCatalogDto } from './dto/update-permission_type_catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionTypeCatalog } from '../../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class PermissionTypeCatalogService {
	private baseService: BaseService<PermissionTypeCatalog>;

	constructor(
		@InjectRepository(PermissionTypeCatalog)
		private readonly permissionTypeCatalogRepository: Repository<PermissionTypeCatalog>,
	) {
		this.baseService = new BaseService(this.permissionTypeCatalogRepository);
	}

  create(createPermissionTypeCatalogDto: CreatePermissionTypeCatalogDto) {
    const permissionTypeCatalog = this.permissionTypeCatalogRepository.create(createPermissionTypeCatalogDto);
		return this.permissionTypeCatalogRepository.save(permissionTypeCatalog);
  }

  findAll(query: Partial<CreatePermissionTypeCatalogDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<PermissionTypeCatalog> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.permissionTypeCatalogRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePermissionTypeCatalogDto: UpdatePermissionTypeCatalogDto) {
    const permissionTypeCatalog = await this.permissionTypeCatalogRepository.findOne({
			where: { id }
		});
		if (!permissionTypeCatalog) {
			throw new NotFoundException(`PermissionTypeCatalog with ID ${id} does not exist.`);
		}
		const updatedPermissionTypeCatalog = this.permissionTypeCatalogRepository.merge(permissionTypeCatalog, updatePermissionTypeCatalogDto);
		return this.permissionTypeCatalogRepository.save(updatedPermissionTypeCatalog);
  }

  async remove(id: string) {
    const permissionTypeCatalog = await this.permissionTypeCatalogRepository.findOne({
			where: { id }
		});
		if (!permissionTypeCatalog) {
			throw new NotFoundException(`PermissionTypeCatalog with ID ${id} does not exist.`);
		}
		return this.permissionTypeCatalogRepository.remove(permissionTypeCatalog);
  }
}

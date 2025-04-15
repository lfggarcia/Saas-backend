import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserStatusCatalogDto } from './dto/create-user-status-catalog.dto';
import { UpdateUserStatusCatalogDto } from './dto/update-user-status-catalog.dto';
import { UserStatusCatalog } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserStatusCatalogService {
	private baseService: BaseService<UserStatusCatalog>;

	constructor(
		@InjectRepository(UserStatusCatalog)
		private readonly userStatusCatalogRepository: Repository<UserStatusCatalog>
	) {
		this.baseService = new BaseService(this.userStatusCatalogRepository);
	}

  create(createUserStatusCatalogDto: CreateUserStatusCatalogDto) {
    const userStatusCatalog = this.userStatusCatalogRepository.create(createUserStatusCatalogDto);
		return this.userStatusCatalogRepository.save(userStatusCatalog);
  }

  findAll(query: Partial<CreateUserStatusCatalogDto>) {
		const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<UserStatusCatalog> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.userStatusCatalogRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserStatusCatalogDto: UpdateUserStatusCatalogDto) {
    const userStatusCatalog = await this.userStatusCatalogRepository.findOne({
			where: { id }
		});
		if (!userStatusCatalog) {
			throw new NotFoundException(`UserStatusCatalog with ID ${id} does not exist.`);
		}
		const updatedUserStatusCatalog = this.userStatusCatalogRepository.merge(userStatusCatalog, updateUserStatusCatalogDto);
		return this.userStatusCatalogRepository.save(updatedUserStatusCatalog);
  }

  async remove(id: string) {
    const userStatusCatalog = await this.userStatusCatalogRepository.findOne({
			where: { id }
		});
		if (!userStatusCatalog) {
			throw new NotFoundException(`UserStatusCatalog with ID ${id} does not exist.`);
		}
		return this.userStatusCatalogRepository.remove(userStatusCatalog);
  }
}

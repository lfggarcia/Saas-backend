import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserStatusCatalogService } from '../user-status-catalog/user-status-catalog.service';

@Injectable()
export class UsersService {
	private baseService: BaseService<Users>;

	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>,
		private readonly userStatusCatalogService: UserStatusCatalogService
	) {
		this.baseService = new BaseService(this.usersRepository);
	}

  async create(createUserDto: CreateUserDto) {
		const {statusId,...data} = createUserDto;
		const status = await this.userStatusCatalogService.findOne(statusId);
		if (!status) {
			throw new NotFoundException(`Status with ID ${statusId} does not exist.`);
		}
    const user = this.usersRepository.create({
			...data,
			status: {
				id: statusId
			}
		});
		return this.usersRepository.save(user);
  }

  findAll(query: Partial<CreateUserDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<Users> = {};
			if (q.id) filters.id = q.id;
			if (q.username) filters.username = q.username;
			if (q.email) filters.email = q.email;
			if (q.fullName) filters.fullName = q.fullName;
			if (q.statusId) filters.status = q.statusId;

			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.usersRepository.findOne({
			where: { id }
		});
		if (!user) {
			throw new NotFoundException(`User with ID ${id} does not exist.`);
		}
		const {statusId,...data} = updateUserDto;
		if (statusId) {
			const status = await this.userStatusCatalogService.findOne(statusId);
			if (!status) {
				throw new NotFoundException(`Status with ID ${statusId} does not exist.`);
			}
		}
		const updatedUser = this.usersRepository.merge(user, {
			...data,
			status: {
				id: statusId
			}
		});
		return this.usersRepository.save(updatedUser);
  }

  async remove(id: string) {
		const user = await this.usersRepository.findOne({
			where: { id }
		});
		if (!user) {
			throw new NotFoundException(`User with ID ${id} does not exist.`);
		}
		return this.usersRepository.remove(user);
  }
}

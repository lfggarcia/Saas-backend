import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoles } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserRolesService {
	private baseService: BaseService<UserRoles>;

	constructor(
		@InjectRepository(UserRoles)
		private readonly userRolesRepository: Repository<UserRoles>,
		private readonly userService: UsersService,
		private readonly roleService: RolesService
	){
		this.baseService = new BaseService<UserRoles>(this.userRolesRepository)
	}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const { userId, roleId } = createUserRoleDto;
		const newUserRole: DeepPartial<UserRoles> = {}

		const user = await this.userService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with id ${userId} not found`);
		}
		newUserRole.user = user;

		const role = await this.roleService.findOne(roleId);
		if (!role) {
			throw new NotFoundException(`Role with id ${roleId} not found`);
		}
		newUserRole.role = role;
		const existingUserRole = await this.userRolesRepository.findOne({
			where: {
				user: { id: userId },
				role: { id: roleId }
			}
		});
		if (existingUserRole) {
			throw new NotFoundException(`UserRole with userId ${userId} and roleId ${roleId} already exists`);
		}

		const createdUserRole = this.userRolesRepository.create(newUserRole);
		return this.userRolesRepository.save(createdUserRole);
  }

  findAll(query: Partial<CreateUserRoleDto>) {
    const buildFilters = (q: Partial<CreateUserRoleDto & FindOptionsWhere<UserRoles>>) => {
			const filters: FindOptionsWhere<UserRoles> = {};
			if (q.id) filters.id = q.id;
			if (q.userId) filters.user = { id: q.userId };
			if (q.roleId) filters.role = { id: q.roleId };
			return filters;
		}
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.userRolesRepository.findOne({ where: { id }});
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const { userId, roleId } = updateUserRoleDto;
		const updatedUserRole: DeepPartial<UserRoles> = {}
		if (!userId) {
			throw new NotFoundException(`Userid is required`);
		}

		const user = await this.userService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with id ${userId} not found`);
		}
		updatedUserRole.user = user;
		if (!roleId) {
			throw new NotFoundException(`RoleId is required`);
		}
		const role = await this.roleService.findOne(roleId);
		if (!role) {
			throw new NotFoundException(`Role with id ${roleId} not found`);
		}
		updatedUserRole.role = role;

		const userRole = await this.userRolesRepository.findOne({where: {
			id
		}});

		if (!userRole) {
			throw new NotFoundException(`UserRole with ID ${id} does not exist.`);
		}

		const updatedUserRoleEntity = this.userRolesRepository.merge(userRole, updatedUserRole);
		return this.userRolesRepository.save(updatedUserRoleEntity);
  }

  async remove(id: string) {
		const userRole = await this.userRolesRepository.findOne({where: {
			id
		}});
		if (!userRole) {
			throw new NotFoundException(`UserRole with ID ${id} does not exist.`);
		}
		return this.userRolesRepository.remove(userRole);
  }
}

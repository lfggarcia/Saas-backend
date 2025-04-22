import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermissions } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolePermissionsService {
	private baseService: BaseService<RolePermissions>;

	constructor(
		@InjectRepository(RolePermissions)
		private readonly rolePermissionsRepository: Repository<RolePermissions>,
		private readonly rolesService: RolesService,
		private readonly permissionsService: PermissionsService,
	) {
		this.baseService = new BaseService<RolePermissions>(this.rolePermissionsRepository);
	}

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    const {
			permissionId,
			roleId
		} = createRolePermissionDto;
		const newRolePermission: DeepPartial<RolePermissions> = {}

		if (!roleId) {
			throw new BadRequestException('Role ID is required');
		}
		const role = await this.rolesService.findOne(roleId);
		if (!role) {
			throw new NotFoundException('Role not found');
		}
		newRolePermission.role = role;
		if (!permissionId) {
			throw new BadRequestException('Permission ID is required');
		}
		const permission = await this.permissionsService.findOne(permissionId);
		if (!permission) {
			throw new NotFoundException('Permission not found');
		}
		newRolePermission.permission = permission;
		const existRolePermission = await this.rolePermissionsRepository.findOne({
			where: {
				role: {
					id: roleId
				},
				permission: {
					id: permissionId
				}
			}
		});
		if (existRolePermission) {
			throw new BadRequestException('Role Permission already exists');
		}
		newRolePermission.grantedAt = new Date();

		const rolePermission = this.rolePermissionsRepository.create(newRolePermission);
		return this.rolePermissionsRepository.save(rolePermission);
  }

  findAll(query: Partial<CreateRolePermissionDto>) {
    const buildFilters = (q: Partial<CreateRolePermissionDto & FindOptionsWhere<RolePermissions>>) => {
			const filters: FindOptionsWhere<RolePermissions> = {};
			if (q.id) filters.id = q.id;
			if (q.roleId) filters.role = { id: q.roleId };
			if (q.permissionId) filters.permission = { id: q.permissionId };
			if (q.grantedAt) filters.grantedAt = q.grantedAt;
			return filters;
		}
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.rolePermissionsRepository.findOne({
			where: {
				id
			},
		});
  }

  async update(id: string, updateRolePermissionDto: UpdateRolePermissionDto) {
		const {
			permissionId,
			roleId
		} = updateRolePermissionDto;
		const newRolePermission: DeepPartial<RolePermissions> = {}
		if (!roleId) {
			throw new BadRequestException('Role ID is required');
		}
		const role = await this.rolesService.findOne(roleId);
		if (!role) {
			throw new NotFoundException('Role not found');
		}
		newRolePermission.role = role;
		if (!permissionId) {
			throw new BadRequestException('Permission ID is required');
		}
		const permission = await this.permissionsService.findOne(permissionId);
		if (!permission) {
			throw new NotFoundException('Permission not found');
		}
		newRolePermission.permission = permission;
		const existRolePermission = await this.rolePermissionsRepository.findOne({
			where: {
				role: {
					id: roleId
				},
				permission: {
					id: permissionId
				}
			}
		});
		if (existRolePermission) {
			throw new BadRequestException('Role Permission already exists');
		}
		newRolePermission.grantedAt = new Date();
		const rolePermission = await this.rolePermissionsRepository.findOne({
			where: {
				id
			}
		});
		if (!rolePermission) {
			throw new NotFoundException('Role Permission not found');
		}
		const updatedRolePermission = this.rolePermissionsRepository.merge(rolePermission, newRolePermission);
		return this.rolePermissionsRepository.save(updatedRolePermission);
  }

  async remove(id: string) {
		const rolePermission = await this.rolePermissionsRepository.findOne({
			where: {
				id
			}
		});
		if (!rolePermission) {
			throw new NotFoundException(`RolePermission with ID ${id} does not exist.`);
		}
		return this.rolePermissionsRepository.remove(rolePermission);
  }
}

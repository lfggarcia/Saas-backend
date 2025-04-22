import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolePermissions } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([RolePermissions])
		,RolesModule
		,PermissionsModule
	],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
	exports: [RolePermissionsService],
})
export class RolePermissionsModule {}

import { Module } from '@nestjs/common';
import { AppCollaboratorPermissionsService } from './app-collaborator-permissions.service';
import { AppCollaboratorPermissionsController } from './app-collaborator-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCollaboratorsModule } from '../app-collaborators/app-collaborators.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { AppCollaboratorPermissions } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([AppCollaboratorPermissions])
		,AppCollaboratorsModule
		,PermissionsModule
	],
  controllers: [AppCollaboratorPermissionsController],
  providers: [AppCollaboratorPermissionsService],
	exports: [AppCollaboratorPermissionsService],
})
export class AppCollaboratorPermissionsModule {}

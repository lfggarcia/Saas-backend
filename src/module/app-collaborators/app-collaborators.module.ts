import { Module } from '@nestjs/common';
import { AppCollaboratorsService } from './app-collaborators.service';
import { AppCollaboratorsController } from './app-collaborators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsModule } from '../apps/apps.module';
import { UsersModule } from '../users/users.module';
import { CollaboratorRolesModule } from '../collaborator-roles/collaborator-roles.module';
import { AppCollaborators } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([AppCollaborators])
		,AppsModule
		,UsersModule
		,CollaboratorRolesModule
	],
  controllers: [AppCollaboratorsController],
  providers: [AppCollaboratorsService],
	exports: [AppCollaboratorsService],
})
export class AppCollaboratorsModule {}

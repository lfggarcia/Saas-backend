import { Module } from '@nestjs/common';
import { CollaboratorRolesService } from './collaborator-roles.service';
import { CollaboratorRolesController } from './collaborator-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorRoles } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([CollaboratorRoles])],
  controllers: [CollaboratorRolesController],
  providers: [CollaboratorRolesService],
	exports: [CollaboratorRolesService],
})
export class CollaboratorRolesModule {}

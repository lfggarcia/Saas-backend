import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { UserRoles } from '../../entities';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRoles])
		,UsersModule
		,RolesModule
	],
  controllers: [UserRolesController],
  providers: [UserRolesService],
	exports: [UserRolesService]
})
export class UserRolesModule {}

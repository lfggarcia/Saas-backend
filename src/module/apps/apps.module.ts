import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apps, Users, UserStatusCatalog } from '../../entities';
import { UsersService } from '../users/users.service';
import { UserStatusCatalogService } from '../user-status-catalog/user-status-catalog.service';

@Module({
	imports: [TypeOrmModule.forFeature([Apps,Users,UserStatusCatalog])],
  controllers: [AppsController],
  providers: [AppsService, UsersService, UserStatusCatalogService],
})
export class AppsModule {}

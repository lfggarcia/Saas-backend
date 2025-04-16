import { Module } from '@nestjs/common';
import { NavigationsService } from './navigations.service';
import { NavigationsController } from './navigations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apps, Navigations, NavigationTypes, Users, UserStatusCatalog } from '../../entities';
import { AppsService } from '../apps/apps.service';
import { NavigationTypesService } from '../navigation-types/navigation-types.service';
import { UserStatusCatalogService } from '../user-status-catalog/user-status-catalog.service';
import { UsersService } from '../users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Navigations,Apps, Users, UserStatusCatalog, NavigationTypes])],
  controllers: [NavigationsController],
  providers: [NavigationsService, AppsService, NavigationTypesService, UsersService, UserStatusCatalogService],
	
})
export class NavigationsModule {}

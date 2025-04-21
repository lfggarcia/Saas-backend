import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apps } from '../../entities';
import { UsersModule } from '../users/users.module';
import { UserStatusCatalogModule } from '../user-status-catalog/user-status-catalog.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Apps])
		,UsersModule
		,UserStatusCatalogModule
	],
  controllers: [AppsController],
  providers: [AppsService],
	exports: [AppsService],
})
export class AppsModule {}

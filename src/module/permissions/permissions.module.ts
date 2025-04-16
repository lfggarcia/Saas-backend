import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionTypeCatalogModule } from '../permission_type_catalog/permission_type_catalog.module';
import { Permissions } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([Permissions]),PermissionTypeCatalogModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
	exports: [PermissionsService]
})
export class PermissionsModule {}

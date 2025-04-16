import { Module } from '@nestjs/common';
import { PermissionTypeCatalogService } from './permission_type_catalog.service';
import { PermissionTypeCatalogController } from './permission_type_catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionTypeCatalog } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionTypeCatalog])],
  controllers: [PermissionTypeCatalogController],
  providers: [PermissionTypeCatalogService],
	exports: [PermissionTypeCatalogService]
})
export class PermissionTypeCatalogModule {}

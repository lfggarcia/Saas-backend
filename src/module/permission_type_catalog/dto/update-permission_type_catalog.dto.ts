import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionTypeCatalogDto } from './create-permission_type_catalog.dto';

export class UpdatePermissionTypeCatalogDto extends PartialType(CreatePermissionTypeCatalogDto) {}

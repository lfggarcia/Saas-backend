import { PartialType } from '@nestjs/mapped-types';
import { CreateUserStatusCatalogDto } from './create-user-status-catalog.dto';

export class UpdateUserStatusCatalogDto extends PartialType(CreateUserStatusCatalogDto) {}

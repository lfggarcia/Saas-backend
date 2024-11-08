import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsOptional } from 'class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsOptional()
  application_id?: string; // No se debe permitir actualizar application_id
}

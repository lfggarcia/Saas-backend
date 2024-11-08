import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalStyleDto } from './create-global-style.dto';
import { IsOptional } from 'class-validator';

export class UpdateGlobalStyleDto extends PartialType(CreateGlobalStyleDto) {
  @IsOptional()
  application_id?: string; // No se debe permitir actualizar application_id
}

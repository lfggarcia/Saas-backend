import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalStyleVariantDto } from './create-global-style-variant.dto';
import { IsOptional } from 'class-validator';

export class UpdateGlobalStyleVariantDto extends PartialType(CreateGlobalStyleVariantDto) {
  @IsOptional()
  global_style_id?: string; // No se debe permitir actualizar global_style_id
}

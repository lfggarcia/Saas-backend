import { PartialType } from '@nestjs/mapped-types';
import { CreateReducerDto } from './create-reducer.dto';

export class UpdateReducerDto extends PartialType(CreateReducerDto) {
  @IsOptional()
  store_id?: string; // No se debe permitir actualizar store_id
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateReducerActionDto } from './create-reducer-action.dto';
import { IsOptional } from 'class-validator';

export class UpdateReducerActionDto extends PartialType(CreateReducerActionDto) {
  @IsOptional()
  reducer_id?: string; // No se debe permitir actualizar reducer_id
}

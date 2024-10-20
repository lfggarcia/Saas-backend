import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateReducerActionDto {
  @IsString()
  @IsNotEmpty()
  action_name: string;  // Nombre de la acción

  @IsString()
  @IsOptional()
  action_type?: string;  // Tipo de acción (opcional)
}

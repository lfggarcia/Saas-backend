import { IsString, IsOptional, IsJSON } from 'class-validator';

export class CreateScreenComponentDto {
  @IsString()
  globalComponentId: string;  // ID del componente global vinculado

  @IsJSON()
  @IsOptional()
  props?: any;  // JSON opcional para las props del componente
}

import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateReducerDto {
  @IsString()
  @IsNotEmpty()
  name: string;  // Nombre del reducer

  @IsObject()
  @IsOptional()
  initial_state?: object;  // Estado inicial (opcional)
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomTokenDto {
  @IsString()
  @IsNotEmpty()
  key: string;  // Clave del token

  @IsString()
  @IsNotEmpty()
  value: string;  // Valor del token
}

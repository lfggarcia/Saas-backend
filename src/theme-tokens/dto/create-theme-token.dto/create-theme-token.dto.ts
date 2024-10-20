import { IsString, IsNotEmpty } from 'class-validator';

export class CreateThemeTokenDto {
  @IsString()
  @IsNotEmpty()
  token_group: string;  // Grupo de tokens

  @IsString()
  @IsNotEmpty()
  key: string;  // Clave del token

  @IsString()
  @IsNotEmpty()
  value: string;  // Valor del token
}

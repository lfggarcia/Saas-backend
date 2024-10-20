import { IsString, IsNotEmpty } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;  // Nombre del tema, requerido
}

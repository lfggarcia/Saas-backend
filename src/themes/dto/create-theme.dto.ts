import { IsString, IsNotEmpty } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  application_id: string;
}

import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  application_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}

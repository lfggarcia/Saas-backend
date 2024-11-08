import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGlobalStyleDto {
  @IsString()
  @IsNotEmpty()
  application_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  css_properties: any;
}

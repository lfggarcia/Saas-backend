import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGlobalStyleVariantDto {
  @IsString()
  @IsNotEmpty()
  global_style_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  css_properties: any;
}

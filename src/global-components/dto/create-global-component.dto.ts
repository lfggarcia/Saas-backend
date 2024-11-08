import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateGlobalComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  application_id: string;

  @IsString()
  @IsNotEmpty()
  component_type_id: string;

  @IsOptional()
  default_props?: Record<string, any>;
}

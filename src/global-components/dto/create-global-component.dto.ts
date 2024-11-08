import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGlobalComponentDto {
  @IsString()
  @IsNotEmpty()
  component_type_id: string;

  @IsOptional()
  default_props?: Record<string, any>;
}

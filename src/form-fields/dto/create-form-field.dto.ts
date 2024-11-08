import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFormFieldDto {
  @IsString()
  @IsNotEmpty()
  screen_component_id: string;

  @IsString()
  @IsNotEmpty()
  field_type_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  default_value?: string;
}

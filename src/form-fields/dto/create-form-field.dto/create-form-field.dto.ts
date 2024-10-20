import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateFormFieldDto {
  @IsString()
  field_type: string;

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  props?: any;  // Dependiendo de las props que necesites, puedes usar una validación más específica
}

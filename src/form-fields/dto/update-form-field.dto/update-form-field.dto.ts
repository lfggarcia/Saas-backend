import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateFormFieldDto {
  @IsOptional()
  @IsString()
  field_type?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  props?: any;
}

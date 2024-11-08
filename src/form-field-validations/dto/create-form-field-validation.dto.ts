import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFormFieldValidationDto {
  @IsString()
  @IsNotEmpty()
  form_field_id: string;

  @IsString()
  @IsNotEmpty()
  validation_type_id: string;

  @IsOptional()
  message?: string;

  @IsOptional()
  value?: string;
}

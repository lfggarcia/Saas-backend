import { IsString, IsOptional } from 'class-validator';

export class UpdateFormFieldValidationDto {
  @IsOptional()
  @IsString()
  validation_type?: string;

  @IsOptional()
  @IsString()
  validation_value?: string;

  @IsOptional()
  @IsString()
  validation_message?: string;
}

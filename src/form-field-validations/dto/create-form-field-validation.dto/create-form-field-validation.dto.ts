import { IsString, IsOptional } from 'class-validator';

export class CreateFormFieldValidationDto {
  @IsString()
  validation_type: string;

  @IsOptional()
  @IsString()
  validation_value?: string;

  @IsString()
  validation_message: string;
}

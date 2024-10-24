import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateValidationTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

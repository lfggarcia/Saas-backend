import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFieldTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
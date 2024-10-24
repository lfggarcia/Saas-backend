import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateComponentTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

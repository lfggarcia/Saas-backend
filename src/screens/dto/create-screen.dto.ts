import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateScreenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  feature_id: string;
}

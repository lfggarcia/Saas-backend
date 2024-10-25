import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  status_id: string;
}

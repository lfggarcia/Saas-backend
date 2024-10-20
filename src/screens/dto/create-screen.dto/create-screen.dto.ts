import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateScreenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  route_name?: string;

  @IsBoolean()
  preload: boolean;

  @IsString()
  @IsOptional()
  status?: string;
}

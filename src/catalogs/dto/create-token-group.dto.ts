import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTokenGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAliasDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  property: string;

  @IsString()
  @IsOptional()
  description?: string;
}

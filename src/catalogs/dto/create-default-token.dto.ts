import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDefaultTokenDto {
  @IsString()
  @IsNotEmpty()
  token_group_id: string;

  @IsString()
  @IsNotEmpty()
  token_key: string;

  @IsString()
  @IsNotEmpty()
  token_value: string;

  @IsString()
  @IsOptional()
  description?: string;
}

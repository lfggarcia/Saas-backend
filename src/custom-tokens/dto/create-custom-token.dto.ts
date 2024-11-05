import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomTokenDto {
  @IsString()
  @IsNotEmpty()
  theme_id: string;

  @IsString()
  @IsNotEmpty()
  token_group_id: string;

  @IsString()
  @IsNotEmpty()
  token_key: string;

  @IsString()
  @IsNotEmpty()
  token_value: string;
}

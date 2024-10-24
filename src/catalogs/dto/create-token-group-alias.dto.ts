import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTokenGroupAliasDto {
  @IsString()
  @IsNotEmpty()
  token_group_id: string;

  @IsString()
  @IsNotEmpty()
  alias_id: string;
}

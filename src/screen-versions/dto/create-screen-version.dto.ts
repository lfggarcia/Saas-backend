import { IsString, IsNotEmpty } from 'class-validator';

export class CreateScreenVersionDto {
  @IsString()
  @IsNotEmpty()
  screen_id: string;

  @IsString()
  @IsNotEmpty()
  version: string;
}

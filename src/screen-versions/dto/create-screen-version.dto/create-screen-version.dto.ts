import { IsString, IsNotEmpty } from 'class-validator';

export class CreateScreenVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string;
}

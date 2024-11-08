import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTranslationKeyDto {
  @IsString()
  @IsNotEmpty()
  application_id: string;

  @IsString()
  @IsNotEmpty()
  key: string;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTranslationValueDto {
  @IsString()
  @IsNotEmpty()
  translation_key_id: string;

  @IsString()
  @IsNotEmpty()
  language_id: string;

  @IsString()
  @IsNotEmpty()
  translation_text: string;
}

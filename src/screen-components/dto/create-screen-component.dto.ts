import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateScreenComponentDto {
  @IsString()
  @IsNotEmpty()
  screen_version_id: string;

  @IsString()
  @IsNotEmpty()
  global_component_id: string;

  @IsOptional()
  props?: Record<string, any>;

  @IsOptional()
  @IsString()
  translation_key_id?: string;
}

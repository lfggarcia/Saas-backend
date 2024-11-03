import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  screen_id: string;

  @IsString()
  @IsNotEmpty()
  component_type_id: string;

  @IsInt()
  @IsOptional()
  order?: number;
}

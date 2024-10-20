import { IsString, IsOptional, IsJSON } from 'class-validator';

export class CreateGlobalComponentDto {
  @IsString()
  type: string;

  @IsJSON()
  @IsOptional()
  default_props?: any;
}

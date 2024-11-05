import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateGlobalComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  component_type_id: string;

  @IsOptional()
  defaultProps?: Record<string, any>;
}

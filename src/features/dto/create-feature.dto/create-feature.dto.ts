import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['beta', 'production'])
  status: string;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFeatureVersionDto {
  @IsString()
  @IsNotEmpty()
  feature_id: string;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsOptional()
  @IsString()
  replaces_feature_version_id?: string;
}

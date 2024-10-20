import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateFeatureVersionDto {
  @IsString()
  version: string;

  @IsUUID()
  @IsOptional()
  replaces_feature_id?: string;
}

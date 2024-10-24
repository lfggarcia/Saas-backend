import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  max_apps: number;

  @IsInt()
  max_features: number;

  @IsInt()
  max_screens_per_feature: number;
}

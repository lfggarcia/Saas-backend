import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReducerActionDto {
  @IsString()
  @IsNotEmpty()
  reducer_id: string;

  @IsString()
  @IsNotEmpty()
  action_type: string;

  @IsOptional()
  payload_structure?: any;

  @IsString()
  @IsNotEmpty()
  implementation: string;
}

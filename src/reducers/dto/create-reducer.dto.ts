import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReducerDto {
  @IsString()
  @IsNotEmpty()
  store_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  initial_state: any;
}

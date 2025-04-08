// create-style-alias.dto.ts
import { Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStyleAliasDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  shortKey: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  propertyName: string;
}

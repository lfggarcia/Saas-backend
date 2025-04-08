import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenCategoryDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	name: string;
}

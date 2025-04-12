import { Expose, Type } from "class-transformer";
import { IsEmpty, IsString } from "class-validator";

export class CreatePropertyTypeDto {

	@Expose()
	@IsString()
	@IsEmpty()
	@Type(() => String)
	name: string;

	@Expose()
	@IsString()
	@IsEmpty()
	@Type(() => String)
	description: string | null;
}

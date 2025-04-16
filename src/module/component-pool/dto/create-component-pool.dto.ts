import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateComponentPoolDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	name: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	description: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	typeId: string;
}

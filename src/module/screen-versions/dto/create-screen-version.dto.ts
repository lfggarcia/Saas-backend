import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateScreenVersionDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	screenId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	version: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => Boolean)
	isPublished: boolean;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	createdBy: string;
}

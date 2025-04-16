import { Expose, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateFeatureDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	name: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	version: string;

	@Expose()
	@IsBoolean()
	@IsNotEmpty()
	@Type(() => Boolean)
	isActive: boolean;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	navigationId: string;
}

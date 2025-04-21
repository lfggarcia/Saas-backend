import { Expose, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateFeatureVersionDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	featureId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	version: string;
	
	@Expose()
	@IsBoolean()
	@IsNotEmpty()
	@Type(() => Boolean)
	isPublished: boolean;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	createdBy: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	updatedBy: string;
}

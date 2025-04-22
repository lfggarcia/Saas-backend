import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFeatureVersionScreenDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	featureVersionId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	screenVersionId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	environment: string;
}

import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFeatureScreenDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	featureId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	screenId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	environment: string;
}

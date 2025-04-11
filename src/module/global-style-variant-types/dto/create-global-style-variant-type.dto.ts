import { Expose, Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateGlobalStyleVariantTypeDto {
	@Expose()
	@IsString()
	@Type(() => String)
	name: string;

	@Expose()
	@IsString()
	@Type(() => String)
	description: string | null;

}

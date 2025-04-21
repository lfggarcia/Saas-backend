import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserAliasDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	shortKey: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	propertyOverride: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	aliasId: string;
}

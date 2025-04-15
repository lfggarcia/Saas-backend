import { Expose, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateUserLanguageDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	localeCode: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	displayName: string;

	@Expose()
	@IsBoolean()
	@IsNotEmpty()
	@Type(() => Boolean)
	isDefault: boolean;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;
}

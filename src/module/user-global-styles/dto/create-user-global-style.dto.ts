import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateUserGlobalStyleDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	themeId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	variantTypeId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	variantKey: string;

	@Expose()
	@IsObject()
	@IsNotEmpty()
	@Type(() => Object)
	properties: object;

}

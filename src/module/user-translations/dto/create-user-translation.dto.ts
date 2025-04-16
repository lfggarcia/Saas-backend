import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserTranslationDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	keyId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	languageId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	translation: string;
	
}

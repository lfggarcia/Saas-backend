import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTranslationKeyDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;

	@Expose()
	@IsString()
	@Type(() => String)
	namespace: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	key: string;

	@Expose()
	@IsString()
	@Type(() => String)
	description: string | null;
}

import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenDefinitionDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	categoryId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	tokenKey: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	tokenValue: string;
}

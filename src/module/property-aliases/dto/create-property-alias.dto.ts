import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePropertyAliasDto {
	@IsNotEmpty()
	@IsString()
	alias: string;

	@IsNotEmpty()
	@IsString()
	mapsTo: string;
}

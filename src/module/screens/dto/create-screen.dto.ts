import { Expose, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateScreenDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	name: string;

	@Expose()
	@IsBoolean()
	@IsNotEmpty()
	@Type(() => Boolean)
	isGlobal: boolean;
}

import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNavigationDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	name: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	appId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	typeId: string;
}

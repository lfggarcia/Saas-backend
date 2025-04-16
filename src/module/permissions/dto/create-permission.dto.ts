import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	key: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	label: string;

	@Expose()
	@IsString()
	@Type(() => String)
	description: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	typeId: string;
}

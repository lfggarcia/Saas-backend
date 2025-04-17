import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserThemeDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	name: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	updatedBy: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;

}

import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
	@Expose()
	@IsNotEmpty()
	@IsString()
	@Type(() => String)
	username: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@Type(() => String)
	email: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@Type(() => String)
	password: string;

	@Expose()
	@IsString()
	@Type(() => String)
	fullName: string | null;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	statusId: string;
}

import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserTokenDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;

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

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	baseTokenId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	updatedBy: string;
}

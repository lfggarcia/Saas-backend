import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSessionDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	token: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	ipAddress: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userAgent: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	expiresAt: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;
}

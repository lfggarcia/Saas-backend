import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppCollaboratorDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	appId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	roleId: string;
}

import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppCollaboratorPermissionDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	collaboratorId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	permissionId: string;
}

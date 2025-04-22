import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolePermissionDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	permissionId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	roleId: string;
}

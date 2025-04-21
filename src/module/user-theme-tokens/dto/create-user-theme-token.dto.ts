import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserThemeTokenDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	themeId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	userTokenId: string;
}

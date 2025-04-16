import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateScreenComponentOverrideDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	screenComponentId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	key: string;
	
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	value: string;
}

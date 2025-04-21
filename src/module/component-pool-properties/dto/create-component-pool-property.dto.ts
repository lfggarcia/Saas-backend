import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateComponentPoolPropertyDto {
	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	typeId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	componentId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	key: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	defaultValue: string;
}

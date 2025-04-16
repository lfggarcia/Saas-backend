import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScreenComponentDto {

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	screenId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	componentId: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	alias: string;

	@Expose()
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	positionIndex: number;
}

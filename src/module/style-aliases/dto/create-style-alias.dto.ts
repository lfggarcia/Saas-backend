import { Expose, Type } from "class-transformer";

export class CreateStyleAliasDto {
	@Expose()
	shortKey: string;

	@Expose()
	propertyName: string;

}

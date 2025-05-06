import { Expose, Type } from "class-transformer";

class ResponseAppDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
	@Expose()
	description: string;
}

class ResponseNavigationTypeDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
}

export class ResponseNavigationDto {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	@Type(() => ResponseAppDto)
	app: ResponseAppDto;

	@Expose()
	@Type(() => ResponseNavigationTypeDto)
	type: ResponseNavigationTypeDto;
}
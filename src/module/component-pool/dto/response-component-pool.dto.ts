import { Expose, Type } from "class-transformer";

class ResponseComponentTypeDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
}

export class ResponseComponentPoolDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
	@Expose()
	description: string;
	@Expose()
	@Type(() => ResponseComponentTypeDto)
	type: ResponseComponentTypeDto;
}
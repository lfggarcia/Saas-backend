import { Expose, Type } from "class-transformer";

class ResponseAppUserDto {
	@Expose()
	id: string;
	@Expose()
	username: string;
}

export class ResponseAppDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
	@Expose()
	description: string | null;
	@Expose()
	createdAt: Date | null;
	@Expose()
	
	@Type(() => ResponseAppUserDto)
	user: ResponseAppUserDto;
}
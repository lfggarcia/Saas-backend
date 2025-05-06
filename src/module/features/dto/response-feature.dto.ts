import { Expose, Type } from "class-transformer";

class ResponseNavigationDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
}

export class ResponseFeaturesDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
	@Expose()
	version: string;
	@Expose()
	isActive: boolean;
	@Expose()
	@Type(() => ResponseNavigationDto)
	navigation: ResponseNavigationDto;
}
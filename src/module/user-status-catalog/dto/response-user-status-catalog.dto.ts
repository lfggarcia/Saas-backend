import { Expose } from "class-transformer";

export class ResponseUserStatusCatalogDto {
	@Expose()
	id: string;
	@Expose()
	name: string;
	@Expose()
	description: string;
}
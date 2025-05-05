import { Expose, Type } from "class-transformer";
import { ResponseUserStatusCatalogDto } from "../../user-status-catalog/dto/response-user-status-catalog.dto";

export class ResponseUserDto {
	@Expose()
	id: string;
	@Expose()
	username: string;
	@Expose()
	email: string;
	@Expose()
	fullName: string;
	@Expose()
  @Type(() => ResponseUserStatusCatalogDto)
  status?: ResponseUserStatusCatalogDto
	@Expose()
	createdAt: Date;
	@Expose()
	updatedAt: Date;
}

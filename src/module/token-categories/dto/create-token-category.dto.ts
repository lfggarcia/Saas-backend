import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenCategoryDto {
	@IsNotEmpty()
	@IsString()
	name: string;
}

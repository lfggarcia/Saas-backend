import { IsNotEmpty, IsString } from "class-validator";

export class CreateDefaultTokenDto {
	@IsNotEmpty()
	@IsString()
	categoryId: string;

	@IsNotEmpty()
	@IsString()
	key: string;

	@IsNotEmpty()
	@IsString()
	value: string;
}

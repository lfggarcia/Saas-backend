import { IsNotEmpty, IsString } from "class-validator";
import { IsObjectOrPrimitive } from "../../../validators/IsObjectOrPrimitive";

export class CreateTokenStyleDto {
	@IsNotEmpty()
	@IsString()
	styleGroup: string;

	@IsNotEmpty()
	@IsString()
	variantLevel: string;

	@IsNotEmpty()
	@IsString()
	property: string;

	@IsNotEmpty()
  @IsObjectOrPrimitive()
  value: any;
}

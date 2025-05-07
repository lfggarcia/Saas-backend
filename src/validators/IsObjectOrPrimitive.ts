// src/validators/IsObjectOrPrimitive.ts
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsObjectOrPrimitive(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isObjectOrPrimitive",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            value !== null &&
            (typeof value === "object" ||
             typeof value === "string" ||
             typeof value === "number" ||
             typeof value === "boolean")
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser un objeto o valor primitivo (string, number o boolean)`;
        },
      },
    });
  };
}

import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "isNumeric", async: false })
class IsNumberOrStringValidatorRule implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === "number" || !isNaN(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args?.property} must be numeric`;
  }
}

export function IsNumeric(validationOptions?: ValidationOptions): any {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "isNumeric",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNumberOrStringValidatorRule,
    });
  };
}

export function isNumeric(value: any): boolean {
  return typeof value === "number" || !isNaN(value);
}

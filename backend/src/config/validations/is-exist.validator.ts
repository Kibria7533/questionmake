import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Inject, Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

@ValidatorConstraint({ name: "IsExist", async: true })
@Injectable()
export class ExistenceValidatorRule implements ValidatorConstraintInterface {
  @Inject()
  private entityManager: EntityManager;

  isArraySearch: boolean;
  mismatchedValues: any[] = [];

  async validate(value: any, args: any): Promise<boolean> {
    console.log(args);
    const entityClass = Array.isArray(args.constraints[0]) ? args.constraints[0][0] : args.constraints[0];
    const attribute = args.constraints[1] ?? args.property;

    console.log(entityClass);

    const result: any = await this.entityManager.getRepository(entityClass).findOne({
      where: {
        [attribute]: value,
      },
    });
    // .createQueryBuilder()
    // .where(`${attribute} IN(:...inputValues)`, { inputValues: uniqueValues })
    // .select([attribute])
    // .distinct()
    // .getRawMany();

    return !!result;
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args?.property} doesn't exist`;
  }
}

// Can check Array or string existences
export function IsExist(entityName: any, attribute: string, validationOptions?: ValidationOptions): any {
  const cns: any[] = [entityName, attribute];
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "IsExist",
      target: object.constructor,
      propertyName: propertyName,
      constraints: cns,
      options: validationOptions,
      validator: ExistenceValidatorRule,
    });
  };
}

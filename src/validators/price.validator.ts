import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPrice(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsPrice',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const pattern = /^\$?\d+(,\d{3})*(\.\d{2})?$/
                    return pattern.test(value)
                },
            },
        });
    };
}

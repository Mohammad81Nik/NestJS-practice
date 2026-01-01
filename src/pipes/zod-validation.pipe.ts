import {
  ArgumentMetadata,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import z from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException();
    }
  }
}

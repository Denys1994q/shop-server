import {BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {Schema} from 'yup';

@Injectable()
export class YupValidationPipe<T> implements PipeTransform<T> {
  constructor(private readonly schema: Schema<T>) {}

  async transform(value: T) {
    try {
      await this.schema.validate(value, {abortEarly: false});
    } catch (err) {
      const errors = err.inner.map((error: {path: string; message: string}) => ({
        field: error.path,
        message: error.message
      }));
      throw new BadRequestException(errors);
    }
    return value;
  }
}

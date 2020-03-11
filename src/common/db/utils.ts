import { getModelForClass } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { schemaOptions as defaultSchemaOptions } from './schema.options';

export class ModuleBuilder {
  static buildModelForType<T>(type: AnyParamConstructor<T>) {
    const schemaOptions = { ...defaultSchemaOptions, ...type['schemaOptions'] };
    return {
      name: type.name,
      schema: getModelForClass(type, { schemaOptions }).schema
    }
  }
}

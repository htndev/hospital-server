import { SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  }
};

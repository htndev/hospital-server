import * as Joi from 'joi';
import { Logger } from '@nestjs/common';
import DEFAUlTS from '../constants/defaults';

export const parseMongooseError = (err: any) => {
  const errors = err.errors;
  let errorMessage = '';
  for(const key in errors) {
    errorMessage += errors[key].message + '\n';
  }
  return errorMessage.replace(/\n$/g, '');
};

export const isValidBySchema = async (data: any, schema: any) => {
  return Joi.validate(data, schema, { ...DEFAUlTS.SCHEMA_PROPS }).then(() => true).catch((err) => {
    Logger.error(err);
    return false;
  });
};

export const removePassword = ({ password, ...rest }) => ({ ...rest });

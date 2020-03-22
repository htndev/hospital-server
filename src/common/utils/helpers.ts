import * as Joi from 'joi';

export const parseMongooseError = (err: any) => {
  const errors = err.errors;
  let errorMessage = '';
  for(const key in errors) {
    errorMessage += errors[key].message + '\n';
  }
  return errorMessage.replace(/\n$/g, '');
};

export const isValidBySchema = async (data: any, schema: any) => {
  return Joi.validate(data, schema).then(() => true).catch(() => false);
};

export const removePassword = ({ password, ...rest }) => ({ ...rest });

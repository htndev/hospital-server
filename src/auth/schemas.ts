import * as Joi from 'joi';

export const newUserSchema = {
  phone: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  patronymics: Joi.string(),
  gender: Joi.string().default('male'),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().required()
};

export const loginUserSchema = {
  phone: Joi.string().required(),
  password: Joi.string().required()
};

import * as Joi from 'joi';

export const newUserSchema = {
  phone: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().required()
};

export const loginUserSchema = {
  phone: Joi.string().required(),
  password: Joi.string().required()
};

export const updateUserSchema = {
  phone: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required()
};

export const updateUserPasswordSchema = {
  phone: Joi.string().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  newPasswordConfirmation: Joi.string().required()
};

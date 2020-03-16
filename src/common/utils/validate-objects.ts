import * as _ from 'lodash';
import { BadRequestException } from '@nestjs/common';

const isAllPropsProvided = (obj1: object, obj2: object, text?: string): boolean => {
  if (!_.isEqual(Object.keys(obj1), Object.keys(obj2))) {
    throw new BadRequestException(text);
  }
  return true;
};

export const checkEmptyProperties = (object: object, comparableObject: object = {}, message = 'Not all required data provided.') => {
  comparableObject && isAllPropsProvided(object, comparableObject, message);
  for (const prop in object) {
    if (!object[prop]) {
      throw new BadRequestException(message);
    }
  }
};

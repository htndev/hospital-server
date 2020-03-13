import CONSTANTS from '../constants'
import {Logger} from "@nestjs/common";

const { REJECTIONS, DEFAULT_ERROR_KEY, REJECTIONS_TEMPlATE, ERROR_FIELDS } = CONSTANTS;
const fieldTemplate = '{{ field }}';

const rejectionsToString = (rejections: object, separator: string) => Object.keys(rejections).map(v => v.replace(/\s+/g, '\\s')).join(separator);

const getErrorMessage = (message: string): string => {
  const errorMessages = rejectionsToString(REJECTIONS, '|');
  const matches = message.match(new RegExp(errorMessages, 'g'));
  const errorType = matches[0] || DEFAULT_ERROR_KEY;
  return REJECTIONS[errorType];
};

const getMessage = e => e.errmsg;

const getField = e => Object.keys(e.keyPattern)[0];

const createText = (message: string, field: string) => {
  switch (field) {
    case ERROR_FIELDS.PHONE:
      return message.replace(fieldTemplate, REJECTIONS_TEMPlATE[ERROR_FIELDS.PHONE]);
    case ERROR_FIELDS.PASSWORD:
      return message.replace(fieldTemplate, REJECTIONS_TEMPlATE.password);
    default:
      return message;
  }
};

export const handleError = e => {
  Logger.log(e);
  const message = getErrorMessage(getMessage(e));
  return createText(message, getField(e));
};

import { Validator } from 'typegoose';
import PATTERNS from '../constants/patterns';

export default {
  password: {
    validator: (v: string) => PATTERNS.PASSWORD().test(v),
    message: 'Пароль должен содержать минимум 6 символов.'
  } as Validator
};

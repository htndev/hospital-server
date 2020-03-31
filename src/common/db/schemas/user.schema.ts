import { Schema } from 'mongoose';
import PATTERNS from '../../constants/patterns';
import { Security } from '../../utils/security';
import DEFAULTS from '../../constants/defaults';
import COLLECTIONS from '../collections';
const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: (v: string) => PATTERNS.PHONE().test(v),
      message: 'Телефон должен иметь правильный формат и состоять из 12 цифр.'
    }
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  patronymics: {
    type: String
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => PATTERNS.PASSWORD().test(v),
      message: 'Пароль должен иметь минимум 6 символов.'
    }
  },
  access: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  ...DEFAULTS.DB_PROPS,
  collection: COLLECTIONS.USERS
});

UserSchema.pre('save', async function(next) {
  (this as any).password = await Security.cryptPassword((this as any).password);
  next();
});

export default UserSchema;

import { Schema } from 'mongoose';
import DEFAULTS from '../../constants/defaults';
import COLLECTIONS from '../collections';
import { v4 } from 'uuid';

const SpecialitySchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  uid: {
    default: () => v4(),
    index: true,
    type: String,
    unique: true
  }
}, {
  ...DEFAULTS.DB_PROPS,
  collection: COLLECTIONS.SPECIALITIES
});

export default SpecialitySchema;

import { Schema } from 'mongoose';
import DEFAULTS from '../../constants/defaults';
import COLLECTIONS from '../collections';

const DoctorSchema = new Schema({
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
  speciality: [ {
    type: String
  } ],
  image: {
    type: String
  }
}, {
  ...DEFAULTS.DB_PROPS,
  collection: COLLECTIONS.DOCTORS
});

export default DoctorSchema;

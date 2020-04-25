import { Schema, Types } from 'mongoose';
import DEFAULTS from '../../constants/defaults';
import COLLECTIONS from '../collections';

const CallbackSchema = new Schema({
  doctorId: {
    type: Types.ObjectId
  },
  patientPhone: {
    type: String
  },
  speciality: {
    type: String
  }
}, {
  ...DEFAULTS.DB_PROPS,
  collection: COLLECTIONS.CALLBACK
});

export default CallbackSchema;

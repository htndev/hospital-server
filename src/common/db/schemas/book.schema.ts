import { Schema, Types } from 'mongoose';
import DEFAULTS from '../../constants/defaults';
import COLLECTIONS from '../collections';

const BookSchema = new Schema({
  doctorId: {
    type: Types.ObjectId
  },
  patientPhone: {
    type: String
  },
  speciality: {
    type: String
  },
  acceptanceDate: {
    type: Date
  },
  comment: {
    type: String,
    default: ''
  }
}, {
  ...DEFAULTS.DB_PROPS,
  collection: COLLECTIONS.BOOKS
});

export default BookSchema;

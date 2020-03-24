import { Document } from 'mongoose';

export interface User extends Document {
  phone: string;
  name: string;
  surname: string;
  patronymics?: string;
  password: string;
}

import { Document } from 'mongoose';

export interface User extends Document {
  phone: string;
  name: string;
  surname: string;
  patronymics?: string;
  password: string;
}

export interface Speciality extends Document {
  title: string;
}

export interface Doctor extends Document {
  name: string;
  surname: string;
  patronymics: string;
  speciality: string[];
}

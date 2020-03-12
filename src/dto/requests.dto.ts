import { Gender } from '../common/db/models/user.model';

export class NewUserDto {
  phone: string;
  name: string;
  surname: string;
  patronymics: string;
  gender: Gender;
  password: string;
}

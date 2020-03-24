export class NewUserDto {
  phone: string;
  name: string;
  surname: string;
  patronymics?: string;
  password: string;
  passwordConfirmation: string;
}

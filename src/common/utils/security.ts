import { genSalt, hash, compare } from 'bcrypt';

export class Security {
  static async cryptPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  static async comparePasswords(password: string, realPassword: string): Promise<boolean> {
    return await compare(password, realPassword);
  }
}

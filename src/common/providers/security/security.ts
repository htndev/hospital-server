import { genSalt, hash, compare } from 'bcrypt';
import { Config } from '../config/config'

const config = new Config();

export class SecurityProvider {
  static async cryptPassword(password: string): Promise<string> {
    const salt = await genSalt(config.saltRounds);
    return await hash(password, salt);
  }

  static async comparePasswords(password: string, realPassword: string): Promise<boolean> {
    return await compare(password, realPassword);
  }
}

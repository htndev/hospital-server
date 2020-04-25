import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/db/interfaces';
import { Security } from '../common/utils/security';
import PATTERNS from '../common/constants/patterns';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUserInfo({ phone }): Promise<object | null> {
    return this.userModel.findOne({ phone }, {
      password: 0,
      updatedAt: 0
    });
  }

  async userExists({ phone }): Promise<boolean> {
    const user = await this.userModel.findOne({ phone });
    return !!user;
  }

  async updateInfo(
    { phone, name, surname, patronymics }:
    { phone: string; name: string; surname: string; patronymics: string }
  ) {
    return this.userModel.updateOne({ phone }, { phone, name, surname, patronymics });
  }

  async updatePassword(
    { phone, newPassword, oldPassword }:
    { phone: string; newPassword: string; oldPassword: string }
  ) {
    const { password } = await this.userModel.findOne({ phone }, {
      password: 1,
      _id: 0
    });

    if(!await Security.comparePasswords(oldPassword, password)) {
      throw new BadRequestException('Старый пароль не совпадает с актуальным.');
    }

    if(!PATTERNS.PASSWORD().test(newPassword)) {
      throw new BadRequestException('Новый пароль должен иметь как минимум 6 символов.');
    }

    const newPass = await Security.cryptPassword(newPassword);

    await this.userModel.updateOne({ phone }, { password: newPass });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/db/interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUserInfo({ phone }): Promise<object | null> {
    return this.userModel.findOne({ phone }, {
      password: 0,
      updatedAt: 0
    });
  }
}

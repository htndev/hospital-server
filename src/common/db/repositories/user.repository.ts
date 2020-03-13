import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Document } from 'mongoose';
import { BaseRepository } from './base.repository';
import User from '../models/user.model';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) userModel: ModelType<User>) {
    super(userModel);
  }

  async getUser({ phone, password }: { phone: string, password: string }): Promise<Document> {
    const user = this.findOne({ phone, password });
    if(!user) {
      throw new NotFoundException('User with this phone does not exists.')
    }
    return user;
  }

  async createUser(user: User) {
    return this.create(new this.model(user));
  }
}

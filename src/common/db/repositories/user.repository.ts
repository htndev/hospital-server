import { Injectable } from '@nestjs/common';
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

  getUser(email: string): Promise<Document> {
    return this.findOne({ email });
  }

  createUser(user: User) {
    console.log(user);
    return this.create(new this.model(user));
  }

  async getSomeShit(query: {}) {
    return this.findOne(query);
  }
}

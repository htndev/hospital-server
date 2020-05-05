import {
  BadRequestException,
  Injectable,
  ConflictException,
  Logger,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/db/interfaces';
import { NewUserDto } from '../dto/auth.dto';
import { parseMongooseError, removePassword } from '../common/utils/helpers';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: NewUserDto) {
    const newUser = new this.userModel(user);
    if (await this.exists(newUser)) {
      throw new ConflictException(
        'Пользователь с таким телефоном уже существует.'
      );
    }

    await newUser.validate().catch((err) => {
      Logger.error(err);
      const e = parseMongooseError(err);
      throw new BadRequestException(e);
    });

    await newUser.save().catch((err) => {
      Logger.error(err);
      throw new InternalServerErrorException('Что-то пошло не так.');
    });

    const { _doc } = newUser as any;
    return removePassword(_doc);
  }

  async exists({ phone }: { phone: string }): Promise<boolean> {
    const exists = await this.userModel.findOne(
      { phone },
      {
        phone: 1,
        _id: 0
      }
    );
    return !!exists;
  }

  async getUserByPhone({
    phone
  }: {
    phone: string;
  }): Promise<{ phone: string; password: string }> {
    return this.userModel.findOne({ phone });
  }
}

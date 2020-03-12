import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../common/db/repositories/user.repository';
import User from '../common/db/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async something(userData: User) {
    try {
      const d = await this.userRepository.createUser(userData);
      console.log(d);
      return d;
    } catch (e) {
      Logger.verbose(e);
      throw new BadRequestException('Invalid data');
    }
  }
}

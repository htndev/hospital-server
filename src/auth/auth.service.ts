import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../common/db/repositories/user.repository';
import User from '../common/db/models/user.model';
import { handleError } from '../common/utils/error-handler';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(userData: any) {
    try {
      // TODO: Password compare
      return await this.userRepository.getUser(userData);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async signUp(userData: any) {
    try {
      return await this.userRepository.createUser(userData);
    } catch (e) {
      const err = handleError(e);
      throw new BadRequestException(err);
    }
  }
}

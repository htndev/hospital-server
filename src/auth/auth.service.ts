import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository }                                     from '../common/db/repositories/user.repository';
import { handleError } from '../common/utils/error-handler';
import { checkEmptyProperties } from '../common/utils/validate-objects';
import { signInUser, signUpUser } from '../common/types/comarable-objects';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(userData: any) {
    checkEmptyProperties(userData, signInUser);
    // return await this.userRepository.getUser(userData);
    return '';
  }

  async signUp(userData: any) {
    checkEmptyProperties(userData, signUpUser);
    this.validateSignUp(userData);
    return await this.userRepository.createUser(userData);
  }

  private validateSignUp(data: any) {
    if (data.password !== data.passwordConfirmation) {
      throw new BadRequestException('Passwords do not match.');
    }
  }

  async getUser({ phone }: {phone: string}) {
    const user = await this.userRepository.getUser({ phone });
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return {
      exists: true,
      status: 200
    };
  }
}

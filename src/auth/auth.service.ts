import { Injectable } from '@nestjs/common';
import { UserRepository } from '../common/db/repositories/user.repository';
import User from '../common/db/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async something(userData: User) {
    const d = await this.userRepository.createUser(userData);
    console.log(d);
    return d;
  }
}

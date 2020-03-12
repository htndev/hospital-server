import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import User, { Gender } from '../common/db/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('create')
  async getAuth(
    @Param('phone') phone: string,
    @Param('name') name: string,
    @Param('surname') surname: string,
    @Param('patronymics') patronymics: string,
    @Param('gender') gender: Gender,
    @Param('password') password: string
  ): Promise<object> {
    return await this.authService.something({ phone, name, surname, patronymics, gender, password } as User);
  }
}

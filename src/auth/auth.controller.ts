import { Controller, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from '../common/db/models/user.model';
import { NewUserDto } from '../dto/requests.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Put()
  async getAuth(
    @Body('phone') phone: string
  ): Promise<object> {
    console.log(phone);
    console.log('===');
    return await this.authService.something({phone} as User);
  }
}

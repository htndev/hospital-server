import { Controller, Body, Put, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from '../common/db/models/user.model';
import { NewUserDto, LoginUser } from '../dto/requests.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Body() user: LoginUser
  ): Promise<object> {
    return await this.authService.signIn(user);
  }
  @Put()
  async getAuth(
    @Body() user: NewUserDto
  ): Promise<object> {
    return await this.authService.signUp(user);
  }
}

import { Controller, Body, Put, Post, Get, Param } from '@nestjs/common';
import { AuthService }                             from './auth.service';
import User from '../common/db/models/user.model';
import { NewUserDto, LoginUser } from '../dto/requests.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('exists/:phone')
  async getUser(@Param('phone') phone: string) {
    const d = await this.authService.getUser({ phone });
    return d;
  }

  @Post('login')
  async login(@Body() user: LoginUser): Promise<object> {
    // return await this.authService.signIn(user);
    return {};
  }
  @Put()
  async getAuth(@Body() user: NewUserDto): Promise<object> {
    return await this.authService.signUp(user);
  }
}

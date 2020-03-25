import {
  Get,
  Body,
  Post,
  Query,
  Controller,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from '../dto/auth.dto';
import { isValidBySchema, removePassword } from '../common/utils/helpers';
import {
  newUserSchema,
  loginUserSchema
} from '../common/schemas/schemas';
import { Security } from '../common/utils/security';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('new')
  async newUser(@Body() newUser: NewUserDto): Promise<any> {
    await this.validateIncomingProperties(newUser, newUserSchema);
    return await this.authService.create(newUser);
  }

  @Post('login')
  async login(
    @Body('phone') phone: string,
    @Body('password') password: string
  ): Promise<any> {
    await this.validateIncomingProperties({ phone, password }, loginUserSchema);
    if(!await this.authService.exists({ phone })) {
      throw new NotFoundException('Пользователь с таким телефоном не найден');
    }
    const credentials = await this.authService.getUserByPhone({ phone });
    const isPasswordSame = await Security.comparePasswords(password, credentials.password);

    if(!isPasswordSame) {
      throw new BadRequestException('Пароли не совпадают.');
    }

    return {
      statusCode: 200,
      message: 'Добро пожаловать!',
      payload: removePassword((credentials as any)._doc)
    };
  }

  @Get('exists')
  async userExists(
    @Query('phone') phone: string
  ): Promise<boolean> {
    if(!phone) {
      throw new BadRequestException('Телефон не указан');
    }
    return await this.authService.exists({ phone });
  }

  private async validateIncomingProperties(data: any, schema: any) {
    if(!await isValidBySchema(data, schema)){
      throw new BadRequestException('Не все необходимые свойства указаны.');
    }
  }
}

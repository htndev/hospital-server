import {
  Body,
  Get,
  Put,
  Query,
  HttpStatus,
  Controller,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDataDto, UserUpdatePasswordDto } from '../dto/user.dto';
import { isValidBySchema } from '../common/utils/helpers';
import {
  updateUserSchema,
  updateUserPasswordSchema
} from '../common/schemas/schemas';

@Controller('user/info')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'phone', required: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'Returns boolean.' })
  async getInfo(@Query('phone') phone: string) {
    return this.userService.getUserInfo({ phone });
  }

  @Put()
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.OK, type: UserDataDto })
  async updateInfo(@Body() userData: UserDataDto) {
    if(!await isValidBySchema(userData, updateUserSchema)) {
      throw new BadRequestException('Вы не указали некорректные данные.');
    }

    if(!await this.userService.userExists({ phone: userData.phone })) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.userService.updateInfo(userData as any);

    return {
      message: 'Даннные успешно обнавлены.',
      status: 200
    };
  }

  @Put('/password')
  // @ApiQuery()
  async updatePassword(
    @Body() userData: UserUpdatePasswordDto
  ) {
    if(!await isValidBySchema(userData, updateUserPasswordSchema)) {
      throw new BadRequestException('Вы не указали некорректные данные.');
    }

    if(userData.newPassword !== userData.newPasswordConfirmation) {
      throw new BadRequestException('Пароли не совпадают.');
    }

    if(!await this.userService.userExists({ phone: userData.phone })) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.userService.updatePassword(userData as any);

    return {
      status: 200,
      message: 'Пароль успешно сменен.'
    };
  }
}

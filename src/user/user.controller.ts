import {
  Body,
  Get,
  Put,
  Query,
  Controller, BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDataDto } from '../dto/user.dto';
import { isValidBySchema } from '../common/utils/helpers';
import { updateUserSchema } from '../common/schemas/schemas';

@Controller('user/info')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getInfo(@Query('phone') phone: string) {
    return this.userService.getUserInfo({ phone });
  }

  @Put()
  async updateInfo(@Body() userData: UserDataDto) {
    if(!await isValidBySchema(userData, updateUserSchema)) {
      throw new BadRequestException('Вы ввели некорректные данные.');
    }

    this.userService;
    return {};
  }
}

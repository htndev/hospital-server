import { Controller, Post, Put } from '@nestjs/common';

@Controller('user/info')
export class UserController {
  @Put()
  async updateInfo() {
    return {};
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { NewCallbackDto } from '../dto/callback.dto';

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Get()
  async getCallback() {
    return this.callbackService.getAllCallbacks();
  }

  @Post()
  async addCallback(
    @Body() callback: NewCallbackDto
  ) {
    await this.callbackService.createNewCallback(callback);
    return {
      status: 200,
      message: 'Ожидайте звонка от оператора.'
    };
  }

  @Delete(':id')
  async deleteCallback(
    @Param('id') id: string
  ) {
    await this.callbackService.deleteCallback(id);
    return {
      status: 200,
      message: 'Запись успешно удалена.'
    };
  }
}

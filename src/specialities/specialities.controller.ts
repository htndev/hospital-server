import {
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Controller,
  BadRequestException, Put, ConflictException, NotFoundException
} from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Get()
  @ApiQuery({
    name: 'doctorsRequired',
    enum: [ 'object', 'amount', undefined ]
  })
  async getSpecialities(
    @Query('doctorsRequired') doctorsRequired: 'object' | 'amount' | unknown
  ) {
    return await this.specialitiesService.getAllSpecialities(doctorsRequired);
  }

  @Get('exists')
  async specialityExists(
    @Query('title') title: string
  ) {
    return await this.specialitiesService.specialityExists({ title });
  }

  @Post()
  async addSpeciality(@Body() props = {}) {
    const { title } = props as any;
    if(!title) {
      throw new BadRequestException('Укажите название.');
    }
    const spec = await this.specialitiesService.addSpeciality({ title });
    return this.getAvailableProps(spec);
  }

  @Put()
  async editSpeciality(
    @Body() props = {}
  ) {
    const { title, uid } = props as any;
    if(!title || !uid) {
      throw new BadRequestException('Укажите название и идентификатор.');
    }

    const specExists = await this.specialitiesService.specialityExists({ title });

    if(specExists) {
      throw new ConflictException('Нельзя заменить на существующее название.');
    }

    return await this.specialitiesService.updateSpeciality({ title, uid });
  }

  @Delete(':uid')
  async deleteSpeciality(
    @Param('uid') uid: string
  ) {
    if(! await this.specialitiesService.specialityExistsByUid({ uid })) {
      throw new NotFoundException('Специальность не найдена');
    }

    await this.specialitiesService.deleteSpeciality({ uid });
    return {
      status: 200,
      message: 'Специальность успешно удалена'
    };
  }

  private getAvailableProps(doc: any) {
    const { createdAt, updatedAt, ...rest } = doc._doc;
    return { ...rest };
  }
}

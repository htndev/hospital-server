import {
  Get,
  Put,
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  BadRequestException, Delete, Param, NotFoundException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v1 as uuid } from 'uuid';
import * as _ from 'lodash';
import * as fse from 'fs-extra';
import * as path from 'path';
import CONSTANTS from '../common/constants/defaults';
import { isValidBySchema } from '../common/utils/helpers';
import { doctorSchema } from '../common/schemas/schemas';
import { DoctorService } from './doctor.service';
import { DoctorDto } from '../dto/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async getAllDoctors() {
    return await this.doctorService.getDoctors();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addDoctor(@UploadedFile() avatar: any, @Body() doctor: DoctorDto): Promise<any> {
    console.log(doctor);
    console.log(avatar);
    if(!await isValidBySchema(doctor, doctorSchema)) {
      throw new BadRequestException('Не все необходимые данные указаны.');
    }

    let image;

    if(avatar) {
      if(avatar.size >= CONSTANTS.SIZES.MAX_AVATAR_SIZE) {
        throw new BadRequestException(`Файл должен быть меньше ${CONSTANTS.SIZES.MAX_AVATAR_SIZE}.`);
      }
      const imageTitle = uuid();
      const ext = this.getExtention(avatar.originalname);
      image = `${imageTitle}.${ext}`;
      const filePath = path.join(__dirname, '..', '..', 'public', 'images', 'doctors', image);
      await fse.writeFile(filePath, avatar.buffer);
    }

    const newDoctor = await this.doctorService.addDoctor({ ...doctor, speciality: JSON.parse(doctor.speciality) }, image);

    return this.removeDevOptions(newDoctor);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async updateDoctor(
    @UploadedFile() avatar: any,
    @Body() doctor: DoctorDto,
    @Body() _id: string
  ) {
    if(!_id) {
      throw new BadRequestException('Не указан id.');
    }

    if(!await this.doctorService.doctorExists({ _id })) {
      throw new BadRequestException('Такого доктора не существует.');
    }

    if(!await isValidBySchema(doctor, doctorSchema)) {
      throw new BadRequestException('Не все необходимые данные указаны.');
    }

    let image;

    if(avatar) {
      if(avatar.size >= CONSTANTS.SIZES.MAX_AVATAR_SIZE) {
        throw new BadRequestException(`Файл должен быть меньше ${CONSTANTS.SIZES.MAX_AVATAR_SIZE}.`);
      }
      const imageTitle = uuid();
      const ext = this.getExtention(avatar.originalname);
      image = `${imageTitle}.${ext}`;
      const filePath = path.join(__dirname, '..', '..', 'public', 'images', 'doctors', image);
      await fse.writeFile(filePath, avatar.buffer);
    }

    await this.doctorService.updateDoctor({ _id, ...doctor, speciality: JSON.parse(doctor.speciality) }, image);

    return {
      status: 200,
      message: 'Доктор успешно обновлен.'
    };
  }

  @Delete(':_id')
  async deleteDoctor(
    @Param('_id') _id: string
  ) {
    if(!await this.doctorService.doctorExists({ _id })) {
      throw new NotFoundException('Доктор с таким id не найден.');
    }

    await this.doctorService.deleteDoctor({ _id });

    return {
      status: 200,
      message: 'Доктор успешно удален.'
    };
  }

  private getExtention(filename: string): string {
    return _.last(filename.split('.'));
  }

  private removeDevOptions(doc: any): object {
    const { createdAt, updatedAt, ...rest } = doc._doc;
    return { ...rest };
  }
}

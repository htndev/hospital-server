import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import DoctorSchema from '../common/db/schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Doctor', schema: DoctorSchema } ])
  ],
  controllers: [ DoctorController ],
  providers: [ DoctorService ]
})
export class DoctorModule {}

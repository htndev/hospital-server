import { Module } from '@nestjs/common';
import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesService } from './specialities.service';
import { MongooseModule } from '@nestjs/mongoose';
import SpecialitySchema from '../common/db/schemas/speciality.schema';
import DoctorSchema from '../common/db/schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Speciality', schema: SpecialitySchema }, { name: 'Doctor', schema: DoctorSchema } ])
  ],
  controllers: [ SpecialitiesController ],
  providers: [ SpecialitiesService ]
})
export class SpecialitiesModule {}

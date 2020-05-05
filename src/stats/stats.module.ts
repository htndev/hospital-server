import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import CallbackSchema from '../common/db/schemas/callback.schema';
import BookSchema from '../common/db/schemas/book.schema';
import DoctorSchema from '../common/db/schemas/doctor.schema';
import SpecialitySchema from '../common/db/schemas/speciality.schema';
import UserSchema from '../common/db/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Callback', schema: CallbackSchema },
      { name: 'Book', schema: BookSchema },
      { name: 'Doctor', schema: DoctorSchema },
      { name: 'Speciality', schema: SpecialitySchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}

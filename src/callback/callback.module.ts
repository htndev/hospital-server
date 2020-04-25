import { Module } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackController } from './callback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import CallbackSchema from '../common/db/schemas/callback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Callback', schema: CallbackSchema } ])
  ],
  providers: [ CallbackService ],
  controllers: [ CallbackController ]
})
export class CallbackModule {}

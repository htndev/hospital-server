import { INestApplication } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { setLogLevel } from '@typegoose/typegoose';

export const setupDebugMode = (app: INestApplication) => {
  mongoose.set('debug', true);
  setLogLevel('DEBUG');
};

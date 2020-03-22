import { INestApplication, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { setLogLevel } from '@typegoose/typegoose';

export const setupDebugMode = (app: INestApplication) => {
  Logger.log('DEBUG MODE ENABLED');
  mongoose.set('debug', true);
  setLogLevel('DEBUG');
};

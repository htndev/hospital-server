import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleBuilder } from './utils';
import { UserRepository } from './repositories/user.repository';
import User from './models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([ ModuleBuilder.buildModelForType(User) ])
  ],
  providers: [
    UserRepository
  ],
  exports: [ UserRepository ]
})
export class DatabaseModule {}

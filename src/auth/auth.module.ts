import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import UserSchema from '../common/db/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env'
    }),
    MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ])
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ]
})
export class AuthModule {}

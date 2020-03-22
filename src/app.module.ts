import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './common/providers/config/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const config = new Config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    MongooseModule.forRoot(process.env.DB_HOST, config.dbConfig),
    AuthModule
  ],
  controllers: [ AppController ],
  providers: [ AppService, Config ],
  exports: [ Config ]
})
export class AppModule {}

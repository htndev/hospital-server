import { AppController } from './app.controller';
import { Config } from './common/providers/config/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { AppService } from './app.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: async (config: Config) => config.dbConfig
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

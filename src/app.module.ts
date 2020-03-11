import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Config } from './common/providers/config/config';

console.log(new Config());

@Module({
  imports: [
    // AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: async (config: Config) => {
        console.log(config);
        return config.dbConfig;
      }
    })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService]
})
export class AppModule {}

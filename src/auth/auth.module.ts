import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [ HttpModule ],
  providers: [ AuthService ],
  controllers: [ AuthController ]
})
export class AuthModule {}

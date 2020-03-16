import { Global, Module } from '@nestjs/common';
import { Config } from './providers/config/config';
import { DatabaseModule } from './db/database.module';

@Global()
@Module({
  imports : [ DatabaseModule ],
  providers: [ Config ],
  exports : [ Config, DatabaseModule ],
})
export class CommonModule {
}

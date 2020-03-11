import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { Config } from './common/providers/config/config';
import { LoggingInterceptors } from './common/interceptors/logging.interceptors';
import { setupSwagger } from './common/utils/swagger';
import { setupDebugMode } from './common/utils/debug';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  app.use((req, res, next) => cors({
    origin: config.allowedDomains,
    allowedHeaders: config.allowedHeaders
  })(req, res, next));

  Logger.overrideLogger(config.logLevels);

  app.use(compression());
  app.useGlobalInterceptors(new LoggingInterceptors());

  if(config.enableSwagger) {
    setupSwagger(app);
  }

  if(config.isDebugMode) {
    setupDebugMode(app);
  }

  await app.listen(config.port, () => Logger.log(`Server run on port: ${config.port}`));
}

bootstrap();

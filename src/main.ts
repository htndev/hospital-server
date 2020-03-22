import { NestFactory } from '@nestjs/core';
import { Logger, Req } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { Config } from './common/providers/config/config';
import * as cors from 'cors';
import * as compression from 'compression';
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
  app.useGlobalInterceptors(new LoggingInterceptor());

  if(config.enableSwagger) {
    setupSwagger(app);
  }

  if(config.isDebugMode) {
    setupDebugMode(app);
  }

  await app.listen(config.port, () => Logger.log(`Server started on port: ${config.port}.`));
}

bootstrap();

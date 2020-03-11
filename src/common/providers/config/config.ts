import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigBase } from './config.base';

@Injectable()
export class Config extends ConfigBase {
  get allowedDomains(): string[] {
    return this.config.ALLOWED_DOMAINS.split(',');
  }

  get allowedHeaders(): string {
    return this.config.ALLOWED_HEADERS;
  }

  get port(): number {
    return this.config.PORT;
  }

  get hostname(): string {
    return this.config.APP_HOSTNAME;
  }

  get appOrigin(): string {
    return this.hostname.includes('localhost') ? `http://${this.hostname}` : `https://${this.hostname}`;
  }

  get dbConfig(): any {
    return {
      uri: this.config.DB_HOST,
      dbName: this.config.DB_NAME,
      retryDelay: 2000,
      retryAttempts: 5,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  }

  get enableSwagger(): boolean {
    return this.config.ENABLE_SWAGGER;
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      PORT: Joi.number().required(),
      APP_HOSTNAME: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_NAME: Joi.string().default('hospital'),
      ALLOWED_DOMAINS: Joi.string().required(),
      ALLOWED_HEADERS: Joi.string().default('*'),
      ENABLE_SWAGGER: Joi.bool().default(false)
    });
  }
}

import * as Joi from 'joi';
import { LogLevel } from '@nestjs/common';

const DEVELOPMENT_NODE_ENV = 'development';

const LOG_LEVEL = {
  DEBUG: 'debug',
  VERBOSE: 'verbose',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  LOG: 'log'
};

console.log(Object.keys(process.env));

const LOG_LEVELS: {[key: string]: LogLevel[]} = {
  debug: ['debug', 'verbose', 'log', 'warn', 'error'],
  verbose: ['verbose', 'log', 'warn', 'error'],
  log: ['log', 'warn', 'error'],
  warn: ['warn', 'error'],
  error: ['error']
};

export abstract class ConfigBase {
  protected readonly config: any;

  abstract getSchema(): Joi.ObjectSchema;

  constructor() {
    const schema = this.getSchema().append({
      NODE_ENV: Joi.string().default(DEVELOPMENT_NODE_ENV),
      LOG_LEVEL: Joi.string()
        .valid(LOG_LEVEL.DEBUG, LOG_LEVEL.VERBOSE, LOG_LEVEL.INFO, LOG_LEVEL.WARN, LOG_LEVEL.ERROR)
        .default(LOG_LEVEL.ERROR)
    });

    this.config = this.validateConfig(process.env, schema);

  }

  private validateConfig(config: any, schema: Joi.ObjectSchema) {
    const { error, value } = Joi.validate(config, schema, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });

    if(error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return value;
  }

  get isDevMode(): boolean {
    return this.config.NODE_ENV === DEVELOPMENT_NODE_ENV;
  }

  get isDebugMode(): boolean {
    return this.config.LOG_LEVEL === DEVELOPMENT_NODE_ENV;
  }

  get logLevels(): LogLevel[] {
    return LOG_LEVELS[this.config.LOG_LEVEL];
  }

}

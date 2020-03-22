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

const LOG_LEVELS: {[k: string]: LogLevel[]} = {
  debug: [ 'debug', 'verbose', 'log', 'warn', 'error' ],
  verbose: [ 'verbose', 'log', 'warn', 'error' ],
  log: [ 'log', 'warn', 'error' ],
  warn: [ 'warn', 'error' ],
  error: [ 'error' ]
};

export abstract class ConfigBase {
  protected readonly config: any;

  abstract getSchema(): Joi.ObjectSchema;

  constructor() {
    const schema = this.getSchema().append({
      NODE_ENV: Joi.string().default(DEVELOPMENT_NODE_ENV),
      LOG_LEVEL: Joi.string()
        .valid(LOG_LEVEL.DEBUG, LOG_LEVEL.VERBOSE, LOG_LEVEL.ERROR, LOG_LEVEL.INFO, LOG_LEVEL.WARN, LOG_LEVEL.LOG)
        .default(LOG_LEVEL.ERROR)
    });
    this.config = ConfigBase.validateConfig(process.env, schema);
  }

  private static validateConfig(config: any, schema: Joi.ObjectSchema) {
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

  get isDevMode() {
    return this.config.NODE_ENV === DEVELOPMENT_NODE_ENV;
  }

  get isDebugMode() {
    return this.config.LOG_LEVEL === LOG_LEVEL.DEBUG;
  }

  get logLevels(): LogLevel[] {
    switch (this.config.LOG_LEVEL) {
      case LOG_LEVEL.DEBUG:
        return [ 'debug', 'verbose', 'log', 'warn', 'error' ];
      case LOG_LEVEL.VERBOSE:
        return [ 'verbose', 'log', 'warn', 'error' ];
      case LOG_LEVEL.INFO:
        return [ 'log', 'warn', 'error' ];
      case LOG_LEVEL.WARN:
        return [ 'warn', 'error' ];
      case LOG_LEVEL.ERROR:
        return [ 'error' ];
    }
  }

}

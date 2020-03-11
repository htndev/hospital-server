export interface MongoDatabaseConfig {
  uri: string;
  dbName: string;
  retryDelay?: number;
  retryAttempts?: number;
  useNewUrlParser: boolean;
  useCreateIndex: boolean;
  useUnifiedTopology: boolean;
  useFindAndModify: boolean;
}

export interface ServerConfig {
  db: DBConfig;
}

export interface DBConfig {
  mysql?: MysqlConfig;
}

export interface MysqlConfig {
  host: string;
  user: string;
}

export interface LoggerConfig {
  error?: LoggerFileOptions;
  combined?: LoggerFileOptions;
}

export interface LoggerFileOptions {
  path?: string;
  maxFiles?: number;
  maxSize?: number;
}

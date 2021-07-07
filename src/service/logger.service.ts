import { LoggerConfig } from '@/interface/config.interface';
import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import logger from '@/common/logger';
import { anyToString } from 'common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends logger implements LoggerService {
  constructor(private readonly configServer: ConfigService) {
    super();
    const config = this.configServer.get<LoggerConfig>('logger');
    this.init(config);
  }

  private context = '';
  setContext(ctx: string): CustomLoggerService {
    this.context = ctx;
    return this;
  }
  log(message: any, context = this.context) {
    this.logger?.withScope(context).log(anyToString(message), context);
  }
  info(message: any, context = this.context) {
    this.logger?.withScope(context).info(anyToString(message), context);
  }
  error(message: any, trace?: string, context = this.context) {
    this.logger?.withScope(context).error(anyToString(message), trace, context);
  }
  warn(message: any, context = this.context) {
    this.logger?.withScope(context).warn(anyToString(message), context);
  }
  debug(message: any, context = this.context) {
    this.logger?.withScope(context).debug(anyToString(message), context);
  }
  verbose(message: any, context = this.context) {
    this.logger?.withScope(context).trace(anyToString(message), context);
  }
}

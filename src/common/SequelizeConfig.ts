import { DBConfig } from '@/interface/config.interface';
import { CustomLoggerService } from '@/service/logger.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { join } from 'path';

// 初始化数据库
@Injectable()
export class SequelizeConfig implements SequelizeOptionsFactory {
  constructor(
    private config: ConfigService,
    private logger: CustomLoggerService,
  ) {}
  createSequelizeOptions(): SequelizeModuleOptions {
    const { mysql = {} } = this.config.get<DBConfig>('db') || {};
    return {
      dialect: 'mysql',
      name: 'connect',
      ...mysql,
      models: [join(__dirname, '../models/*.model.{ts,js}')],
      retryDelay: 1000,
      synchronize: true,
      // sql 执行日志
      logging: (sql, options: any) => {
        let str = '';
        this.logger.setContext('Sequelize');
        const {
          type,
          bind = [],
          instance: { dataValues = bind } = {},
        } = (options || {}) as any;
        if (type && type !== 'SELECT') {
          str = ` ${type} value : ${JSON.stringify(dataValues)}`;
        }
        this.logger.log(sql + ' ' + str);
      },
      pool: {
        max: 10,
        min: 2,
        idle: 2000,
      },
    } as SequelizeModuleOptions;
  }
}

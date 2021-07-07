import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from 'controller/app.controller';
import { AppService } from '@/service/app.service';
import configLoad from 'config/index';
import { LoggerModule } from './logger.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfig } from '@/common/SequelizeConfig';
import { CustomLoggerService } from '@/service/logger.service';
import AuthModule from './auth.module';
import UserModule from './user.module';
import User from '@/models/user.model';

@Module({
  imports: [
    // 加载配置文件
    ConfigModule.forRoot({
      load: [configLoad],
    }),
    LoggerModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, CustomLoggerService],
      useClass: SequelizeConfig,
    }),
    SequelizeModule.forFeature([User]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import UserController from '@/controller/user.controller';
import User from '@/models/user.model';
import UserService from '@/service/user.server';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import AuthModule from './auth.module';
import { LoggerModule } from './logger.module';

@Module({
  imports: [
    LoggerModule,
    //  指定strategy, 不用再AuthGuard里特别指定
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}

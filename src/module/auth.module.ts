import { JwtStrategy } from '@/common/local.strategy';
import AuthService from '@/service/auth-service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UserModule from './user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      async useFactory(config: ConfigService): Promise<JwtModuleOptions> {
        const { expiresIn, secret } = config.get('jwt');
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        } as JwtModuleOptions;
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}

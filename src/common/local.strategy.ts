import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from '@/service/auth-service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt').secret,
    });
  }

  async validate(payload: any): Promise<any> {
    console.log(payload);
    const user = await this.authService.validate(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import AuthService from '@/service/auth-service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// 关于jwt 退出失效的问题  可以设置黑名单的解决方式  具体的可以在网络搜索
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private auth: AuthService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const token = req.headers['access_token'];
    if (!token) return false;
    return this.auth.verify(token as string);
  }

  handleRequest(err: any, user: any, info: any = '') {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('--------', info);
    if (err || !user) {
      throw err || new UnauthorizedException(info);
    }
    return user;
  }
}

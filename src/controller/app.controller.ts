import User from '@/models/user.model';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from 'service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(@Body() user: User): Promise<User> {
    return await this.appService.getHello(user);
  }

  @Get('/ip')
  getIp(@Req() req: any): string {
    function getClientIP(req: any) {
      console.log(req.headers['x-forwarded-for']);
      return (
        req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        // req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress
      );
    }
    return getClientIP(req);
  }
}

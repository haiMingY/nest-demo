import { JwtAuthGuard } from '@/common/jwt.auth.guard';
import ResponseData from '@/common/response';
import User from '@/models/user.model';
import AuthService from '@/service/auth-service';
import { CustomLoggerService } from '@/service/logger.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginResultInfo, LoginParams } from 'common';

@Controller()
export default class UserController {
  constructor(
    private readonly auth: AuthService,
    private logger: CustomLoggerService,
  ) {}

  @Post('/login')
  async login(
    @Body() parmas: LoginParams,
  ): Promise<ResponseData<LoginResultInfo>> {
    const user = await this.auth.validate(parmas.username, parmas.password);
    this.logger.info(user);
    const access_token = await this.auth.createToken(user);
    const result = ResponseData.create<LoginResultInfo>(
      200,
      {
        access_token,
        userId: user?.id,
        username: user?.userName,
      },
      '登录成功',
    );
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Post('/info')
  async info(): Promise<User> {
    console.log('------------ifnoaa');

    return new User();
  }
}

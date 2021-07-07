import User from '@/models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from './user.server';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    console.log(username);
    const data = await this.userService.findUser(username);
    if (!data) throw new Error('用户名不存在!');
    if (data?.password === password) return data;
    else throw new Error('密码错误!');
  }

  async createToken(info: any): Promise<string> {
    const payload = { username: info.username, sub: info.id };
    return await this.jwt.signAsync(payload);
  }

  verify(token: string): boolean {
    return this.jwt.verify<Boolean>(token) as boolean;
  }
}

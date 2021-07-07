import User from '@/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppService {
  constructor(@InjectModel(User) private user: typeof User) {}

  async getHello(u: User): Promise<User> {
    return await this.user.create(u);
  }
}

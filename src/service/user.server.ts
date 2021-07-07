import User from '@/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findUser(userName: string): Promise<User | null> {
    return this.userModel.findOne<User>({
      where: {
        userName: userName,
      },
    });
  }
}

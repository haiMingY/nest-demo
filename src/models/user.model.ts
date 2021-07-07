import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'ow_user',
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column
  id!: number;

  @Column({ field: 'user_name', comment: '用户名' })
  userName!: string;

  @Column({ field: 'user_pwd', comment: '密码' })
  password!: string;
  @Column({ defaultValue: 1, comment: '状态' })
  status!: number;

  @Column({ field: 'login_time', comment: '登录时间' })
  loginTime!: number;

  @Column({ field: 'login_ip', comment: '登录ip' })
  loginIp!: number;
}

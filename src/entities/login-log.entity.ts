import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn({
    name: 'info_id',
    comment: '访问ID',
  })
  infoId: number;

  @Column({
    name: 'user_name',
    comment: '用户账号',
    length: 50,
    default: '',
  })
  userName: string;

  @Column({
    name: 'ipaddr',
    comment: '登录IP地址',
    length: 128,
    default: '',
  })
  ipaddr: string;

  @Column({
    name: 'login_location',
    comment: '登录地点',
    length: 255,
    default: '',
  })
  loginLocation: string;

  @Column({
    name: 'browser',
    comment: '浏览器类型',
    length: 50,
    default: '',
  })
  browser: string;

  @Column({
    name: 'os',
    comment: '浏览器操作系统类型',
    length: 50,
    default: '',
  })
  os: string;

  @Column({
    name: 'status',
    comment: '登录状态（0成功 1失败）',
    length: 1,
    type: 'char',
    default: '0',
  })
  status: string;

  @Column({
    name: 'msg',
    comment: '提示消息',
    length: 255,
    default: '',
  })
  msg: string;

  @Column({
    name: 'login_time',
    comment: '访问时间',
    type: 'datetime',
  })
  loginTime: string;
}

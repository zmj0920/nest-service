import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginLog {
  /* 访问id */
  @PrimaryGeneratedColumn({
    name: 'info_id',
    comment: '访问ID',
  })
  infoId: number;

  /* 用户账号 */
  @Column({
    name: 'user_name',
    comment: '用户账号',
    length: 50,
    default: '',
  })
  userName: string;

  /* 登录IP地址 */
  @Column({
    name: 'ipaddr',
    comment: '登录IP地址',
    length: 128,
    default: '',
  })
  ipaddr: string;

  /* 登录地点 */
  @Column({
    name: 'login_location',
    comment: '登录地点',
    length: 255,
    default: '',
  })
  loginLocation: string;

  /* 浏览器类型 */
  @Column({
    name: 'browser',
    comment: '浏览器类型',
    length: 50,
    default: '',
  })
  browser: string;

  /* 浏览器操作系统类型 */
  @Column({
    name: 'os',
    comment: '浏览器操作系统类型',
    length: 50,
    default: '',
  })
  os: string;

  /* 登录状态（0成功 1失败） */
  @Column({
    name: 'status',
    comment: '登录状态（0成功 1失败）',
    length: 1,
    type: 'char',
    default: '0',
  })
  status: string;

  /* 提示消息 */
  @Column({
    name: 'msg',
    comment: '提示消息',
    length: 255,
    default: '',
  })
  msg: string;

  /* 访问时间 */
  @Column({
    name: 'login_time',
    comment: '访问时间',
    type: 'datetime',
  })
  loginTime: string;
}

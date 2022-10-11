import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'oper_log',
})
export class OperLog {
  @PrimaryGeneratedColumn({
    name: 'oper_id',
    comment: '日志主键',
  })
  operId: number;

  @Column({
    name: 'title',
    comment: '模块标题',
    length: 50,
    default: '',
  })
  title: string;

  @Column({
    name: 'type',
    comment: '业务类型',
    default: '0',
    type: 'char',
    length: 1,
  })
  type: string;

  @Column({
    name: 'method',
    comment: '方法名称',
    length: 100,
    default: '',
  })
  method: string;

  @Column({
    name: 'request_type',
    comment: '请求类型',
    length: 10,
    default: '',
  })
  requestType: string;

  @Column({
    name: 'operator_type',
    comment: '操作类别（0其它 1后台用户 2手机端用户）',
    default: '0',
    type: 'char',
    length: 1,
  })
  operatorType: string;

  @Column({
    name: 'user_name',
    comment: '操作人员',
    length: 50,
    default: '',
  })
  userName: string;

  @Column({
    name: 'user_id',
    comment: '操作人员ID',
    length: 50,
    default: '',
  })
  userId: string;

  @Column({
    name: 'dept_name',
    comment: '部门名称',
    length: 50,
    default: '',
  })
  deptName: string;

  @Column({
    name: 'url',
    comment: '请求URL',
    length: 255,
    default: '',
  })
  url: string;

  @Column({
    name: 'ip',
    comment: '主机地址',
    length: 128,
    default: '',
  })
  ip: string;

  @Column({
    name: 'location',
    comment: '操作地点',
    length: 255,
    default: '',
  })
  location: string;

  @Column({
    name: 'param',
    comment: '请求参数',
    length: 2000,
    default: '',
  })
  param: string;

  @Column({
    name: 'result',
    comment: '返回参数',
    length: 2000,
    default: '',
  })
  result: string;

  @Column({
    name: 'status',
    comment: '操作状态（0正常 1异常）',
    default: 0,
    type: 'int',
  })
  status: number;

  @Column({
    name: 'error_msg',
    comment: '返回参数',
    length: 2000,
    default: '',
  })
  errorMsg: string;

  @CreateDateColumn({
    name: 'oper_time',
    comment: '操作时间',
  })
  operTime: Date | string;
}

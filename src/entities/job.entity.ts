import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Job extends BaseEntity {
  /* 任务Id */
  @PrimaryGeneratedColumn({
    name: 'job_id',
    comment: '任务ID',
  })
  @Type()
  @IsNumber()
  jobId: number;

  /* 任务名称 */
  @Column({
    name: 'job_name',
    comment: '任务名称',
    default: '',
    length: 64,
  })
  @IsString()
  jobName: string;

  /* 任务组名 */
  @Column({
    name: 'job_group',
    comment: '任务组名',
    default: 'DEFAULT',
    length: 64,
  })
  @IsString()
  jobGroup: string;

  /* 调用目标字符串 */
  @Column({
    name: 'invoke_target',
    comment: '调用目标字符串',
    default: null,
    length: 225,
  })
  @IsString()
  invokeTarget: string;

  /* cron执行表达式 */
  @Column({
    name: 'cron_expression',
    comment: 'cron执行表达式',
    default: '',
    length: 225,
  })
  @IsString()
  cronExpression: string;

  /* 计划执行错误策略（1立即执行 2执行一次 3放弃执行） */
  @Column({
    name: 'misfire_policy',
    comment: '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
    default: '3',
    length: 20,
  })
  @Type()
  @IsString()
  misfirePolicy: string;

  /* 是否并发执行（0允许 1禁止） */
  @Column({
    name: 'concurrent',
    comment: '是否并发执行（0允许 1禁止）',
    default: '1',
    type: 'char',
    length: 1,
  })
  @Type()
  @IsString()
  concurrent: string;

  /* 状态（0正常 1暂停） */
  @Column({
    name: 'status',
    comment: '状态（0正常 1暂停）',
    default: '0',
    type: 'char',
    length: 1,
  })
  @IsString()
  status: string;
}

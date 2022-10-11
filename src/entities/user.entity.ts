import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '用户ID',
  })
  @IsNumber()
  userId: number;

  @Column({
    name: 'user_name',
    comment: '用户账号',
    length: 30,
  })
  @IsString()
  userName: string;

  @Column({
    name: 'name',
    comment: '用户昵称',
    length: 30,
  })
  @IsString()
  name: string;

  @Column({
    comment: '用户邮箱',
    length: 50,
    default: null,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @Column({
    comment: '手机号码',
    name:'phone_number',
    length: 11,
    default: null,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Column({
    comment: '用户性别（0男 1女 2未知）',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsOptional()
  @IsString()
  sex: string;

  @Column({
    comment: '头像地址',
    length: 100,
    default: '',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Column({
    comment: '密码',
    length: 100,
    default: '',
    select: false,
  })
  @IsString()
  password: string;

  @ApiHideProperty()
  @Column({
    comment: '盐加密',
    length: 100,
    default: '',
    select: false,
  })
  salt: string;

  @Column({
    comment: '帐号状态（0正常 1停用）',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsString()
  @IsString()
  status: string;

  @Column({
    name: 'login_ip',
    comment: '最后登录IP',
    length: 128,
    default: '',
  })
  @IsOptional()
  @IsString()
  loginIp?: string;

  @Column({
    name: 'login_date',
    comment: '最后登录时间',
    default: null,
  })
  @IsOptional()
  @IsString()
  loginDate?: Date;

  @Column({ name: 'dept_id', comment: '部门id' })
  @IsNumber()
  deptId: number;
}

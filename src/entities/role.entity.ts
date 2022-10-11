import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Dept } from './dept.entity';
import { Menu } from './menu.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  /* 角色ID */
  @PrimaryGeneratedColumn({
    name: 'role_id',
    comment: '角色ID',
    type: 'int',
  })
  @Type()
  @IsNumber()
  roleId: number;

  /* 角色名称 */
  @Column({
    name: 'role_name',
    comment: '角色名称',
    length: 30,
  })
  @IsString()
  roleName: string;

  /* 角色权限字符串 */
  @Column({
    name: 'role_key',
    comment: '角色权限字符串',
    length: 100,
  })
  @IsString()
  roleKey: string;

  /* 显示顺序 */
  @Column({
    name: 'order_num',
    comment: '显示顺序',
  })
  @IsNumber()
  orderNum: number;

  @Column({
    name: 'status',
    comment: '角色状态（0正常 1停用）',
    length: 1,
    type: 'char',
  })
  @IsString()
  status: string;

}

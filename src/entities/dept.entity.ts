import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Dept extends BaseEntity {
  /*  部门id */
  @PrimaryGeneratedColumn({
    name: 'dept_id',
    comment: '部门id',
    type: 'int',
  })
  @Type()
  @IsNumber()
  deptId: number;

  /* 部门名称 */
  @Column({
    name: 'dept_name',
    comment: '部门名称',
    default: '',
    length: 50,
  })
  @IsString()
  deptName: string;

  /*显示顺序  */
  @Column({
    name: 'order_num',
    comment: '显示顺序',
    default: 0,
  })
  @IsNumber()
  orderNum: number;

  /* 负责人 */
  @Column({
    name: 'leader',
    comment: '负责人',
    length: 20,
    default: null,
  })
  @IsOptional()
  @IsString()
  leader?: string;

  /* 联系电话 */
  @Column({
    name: 'phone',
    comment: '联系电话',
    length: 11,
    default: null,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  /* 邮箱 */
  @Column({
    name: 'email',
    comment: '邮箱',
    length: 50,
    default: null,
  })
  @IsOptional()
  @IsString()
  email?: string;

  /* 部门状态 */
  @Column({
    name: 'status',
    comment: '部门状态（0正常 1停用）',
    length: 1,
    default: '0',
    type: 'char',
  })
  @IsString()
  status: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

}

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'menu_id',
    comment: '菜单ID',
    type: 'int',
  })
  @Type()
  @IsNumber()
  menuId: number;

  @Column({
    name: 'name',
    comment: '菜单名称',
    length: 50,
  })
  @IsString()
  name: string;

  @Column({
    name: 'order_num',
    comment: '显示顺序',
  })
  @IsNumber()
  orderNum: number;

  @Column({
    name: 'path',
    comment: '路由地址',
    length: 200,
    default: '',
  })
  @IsOptional()
  @IsString()
  path: string;

  @Column({
    name: 'component',
    comment: '组件路径',
    length: 255,
    default: null,
  })
  @IsOptional()
  @IsString()
  component?: string;

  @Column({
    name: 'query',
    comment: '路由参数',
    length: 255,
    default: null,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @Column({
    name: 'is_frame',
    comment: '是否为外链（0是 1否）',
    type: 'int',
    default: 1,
  })
  @IsOptional()
  @Type()
  @IsNumber()
  isFrame: number;

  @Column({
    name: 'is_cache',
    comment: '是否缓存（0缓存 1不缓存）',
    type: 'int',
    default: 0,
  })
  @IsOptional()
  @Type()
  @IsNumber()
  isCache?: number;

  @Column({
    name: 'menu_type',
    comment: '菜单类型（M目录 C菜单 F按钮）',
    length: 1,
    type: 'char',
    default: '',
  })
  @IsString()
  menuType: string;

  @Column({
    name: 'visible',
    comment: '菜单状态（0显示 1隐藏）',
    length: 1,
    type: 'char',
    default: '0',
  })
  @IsOptional()
  @IsString()
  visible?: string;

  @Column({
    name: 'status',
    comment: '菜单状态（0正常 1停用）',
    length: 1,
    type: 'char',
    default: '0',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @Column({
    name: 'acl',
    comment: '权限标识',
    length: 100,
    default: null,
  })
  @IsOptional()
  @IsString()
  acl?: string;

  @Column({
    name: 'icon',
    comment: '菜单图标',
    length: 100,
    type: 'char',
    default: '#',
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Column({ name: 'parent_id', comment: '父级菜单id', nullable: true })
  parentId: number;
}

import { IsNumber } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'role_menu' })
export default class SysRoleMenu extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: '角色菜单Id' })
  @IsNumber()
  id: number;

  @Column({ name: 'role_id', comment: '角色Id' })
  @IsNumber()
  roleId: number;

  @Column({ name: 'menu_id', comment: '菜单Id' })
  @IsNumber()
  menuId: number;
}

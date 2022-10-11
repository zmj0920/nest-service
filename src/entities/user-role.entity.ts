import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_role' })
export default class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: '用户角色ID' })
  id: number;

  @Column({ name: 'user_id', comment: '用户Id' })
  userId: number;

  @Column({ name: 'role_id', comment: '角色Id' })
  roleId: number;
}

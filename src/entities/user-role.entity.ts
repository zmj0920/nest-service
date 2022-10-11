import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_role' })
export default class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'role_id' })
  roleId: number;
}

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'role_dept' })
export default class RoleDept extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'dept_id' })
  deptId: number;
}

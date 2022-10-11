import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'role_dept' })
export default class RoleDept extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: '部门角色ID' })
  id: number;

  @Column({ name: 'role_id', comment: '角色Id' })
  roleId: number;

  @Column({ name: 'dept_id', comment: '部门Id' })
  deptId: number;
}

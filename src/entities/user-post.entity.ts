import { IsNumber } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_post' })
export default class UserPost extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: '用户部门ID' })
  @IsNumber()
  id: number;

  @Column({ name: 'user_id', comment: '用户ID' })
  @IsNumber()
  userId: number;

  @Column({ name: 'post_id', comment: '部门id' })
  @IsNumber()
  postId: number;
}

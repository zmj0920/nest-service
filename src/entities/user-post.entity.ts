import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_post' })
export default class UserPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'post_id' })
  postId: number;
}

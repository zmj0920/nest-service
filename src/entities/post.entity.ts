import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Post extends BaseEntity {
  /* 岗位ID */
  @PrimaryGeneratedColumn({
    name: 'post_id',
    comment: '岗位ID',
  })
  @Type()
  @IsNumber()
  postId: number;

  /* 岗位编码 */
  @Column({
    unique: true,
    name: 'post_code',
    comment: '岗位编码',
    length: 64,
  })
  @IsString()
  postCode: string;

  /* 岗位名称 */
  @Column({
    name: 'post_name',
    comment: '岗位名称',
    length: 50,
  })
  @IsString()
  postName: string;

  /* 显示顺序 */
  @Column({
    name: 'post_sort',
    comment: '显示顺序',
  })
  @IsNumber()
  postSort: number;

  /* 状态（0正常 1停用 */
  @Column({
    name: 'status',
    comment: '状态（0正常 1停用）',
    length: 1,
    type: 'char',
  })
  @IsString()
  status: string;

  // @ApiHideProperty()
  // @ManyToMany(() => User, (user) => user.posts)
  // users: User[];
}

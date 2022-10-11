import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'post_id',
    comment: '岗位ID',
  })
  @IsNumber()
  postId: number;

  @Column({
    name: 'name',
    comment: '岗位名称',
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
    name: 'status',
    comment: '状态（0正常 1停用）',
    length: 1,
    type: 'char',
  })
  @IsString()
  status: string;
}

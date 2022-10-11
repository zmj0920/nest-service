import { IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

export class BaseEntity {
  /* 创建时间 */
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiHideProperty()
  createTime: Date | string;

  /* 更新时间 */
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiHideProperty()
  updateTime: Date | string;

  /* 创建人 */
  @Column({ name: 'create_by', comment: '创建人', length: '50', default: '' })
  @ApiHideProperty()
  createBy: string;

  /* 更新人 */
  @Column({ name: 'update_by', comment: '更新人', length: '50', default: '' })
  @ApiHideProperty()
  updateBy: string;

  /* 备注 */
  @Column({ name: 'remark', comment: '备注', default: '' })
  @IsOptional()
  @IsString()
  remark?: string;

}

import { IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

export class BaseEntity {
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiHideProperty()
  createTime: Date | string;

  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiHideProperty()
  updateTime: Date | string;

  @Column({ name: 'create_by', comment: '创建人', length: '50', default: '' })
  @ApiHideProperty()
  createBy: string;

  @Column({ name: 'update_by', comment: '更新人', length: '50', default: '' })
  @ApiHideProperty()
  updateBy: string;

  @Column({ name: 'remark', comment: '备注', default: '' })
  @IsOptional()
  @IsString()
  remark?: string;
}

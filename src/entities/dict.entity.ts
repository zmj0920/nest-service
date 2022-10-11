import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'dict',
})
export class Dict extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'dict_id',
    comment: '字典id',
  })
  @Type()
  @IsNumber()
  dictId: number;

  @Column({
    name: 'dict_sort',
    comment: '字典排序',
    default: 0,
  })
  @IsNumber()
  dictSort: number;

  @Column({
    name: 'name',
    length: '100',
    default: '',
    comment: '字典名称',
  })
  @IsString()
  name: string;

  @Column({
    name: 'value',
    length: '100',
    default: '',
    comment: '字典键值',
  })
  @IsString()
  value: string;

  @Column({
    name: 'is_default',
    length: '1',
    type: 'char',
    default: 'N',
    comment: '是否默认（Y是 N否）',
  })
  @IsOptional()
  @IsString()
  isDefault?: string;

  @Column({
    length: '1',
    type: 'char',
    default: '0',
    comment: '状态（0正常 1停用）',
  })
  @IsString()
  status: string;

  @Column({
    name: 'dict_type_id',
    comment: '字典类型ID',
  })
  dictTypeId: number;
}

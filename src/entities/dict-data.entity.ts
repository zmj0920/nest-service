import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DictType } from './dict-type.entity';

@Entity({
  name: 'dict_data',
})
export class DictData extends BaseEntity {
  /* 字典编码 */
  @PrimaryGeneratedColumn({
    name: 'dict_data',
    comment: '字典编码',
  })
  @Type()
  @IsNumber()
  dictCode: number;

  /* 字典排序 */
  @Column({
    name: 'dict_sort',
    comment: '字典排序',
    default: 0,
  })
  @IsNumber()
  dictSort: number;

  /* 字典标签 */
  @Column({
    name: 'dict_label',
    length: '100',
    default: '',
    comment: '字典标签',
  })
  @IsString()
  dictLabel: string;

  /* 字典键值 */
  @Column({
    name: 'dict_value',
    length: '100',
    default: '',
    comment: '字典键值',
  })
  @IsString()
  dictValue: string;

  /* 样式属性（其他样式扩展） */
  @Column({
    name: 'css_class',
    length: '100',
    nullable: true,
    default: null,
    comment: '样式属性（其他样式扩展）',
  })
  @IsOptional()
  @IsString()
  cssClass?: string;

  /* 表格回显样式 */
  @Column({
    name: 'list_class',
    length: '100',
    nullable: true,
    default: null,
    comment: '表格回显样式',
  })
  @IsOptional()
  @IsString()
  listClass?: string;

  /* 是否默认（Y是 N否） */
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

  /* 状态（0正常 1停用） */
  @Column({
    length: '1',
    type: 'char',
    default: '0',
    comment: '状态（0正常 1停用）',
  })
  @IsString()
  status: string;

  /* 字典类型 */
  // @ManyToOne(() => DictType, (dictType) => dictType.dictDatas)

  @Column({
    name: 'dict_type_id',
    comment: '字典类型ID',
  })
  dictTypeId: number;
}

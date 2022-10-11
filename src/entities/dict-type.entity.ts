import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DictData } from './dict-data.entity';

@Entity({
  name: 'dict_type',
})
export class DictType extends BaseEntity {
  /* 字典编码 */
  @PrimaryGeneratedColumn({
    name: 'dict_id',
    comment: '字典类型ID',
  })
  @Type()
  @IsNumber()
  dictId: number;

  /* 字典名称 */
  @Column({
    name: 'dict_name',
    comment: '字典名称',
    default: '',
    length: 100,
  })
  @IsString()
  dictName: string;

  /* 字典类型 */
  @Column({
    unique: true,
    name: 'dict_type',
    comment: '字典类型',
    default: '',
    length: 100,
  })
  @IsString()
  dictType: string;

  /* 状态（0正常 1停用） */
  @Column({
    comment: '状态（0正常 1停用）',
    type: 'char',
    default: 0,
    length: 1,
  })
  @IsString()
  status: string;

  // @OneToMany(() => DictData, (dictData) => dictData.dictType)
  // @ApiHideProperty()
  // dictDatas: DictData[];
}

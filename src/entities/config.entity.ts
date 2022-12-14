import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'config',
})
export class Config extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'config_id',
    comment: '参数主键',
  })
  @IsNumber()
  configId: number;

  @Column({
    name: 'config_name',
    length: 100,
    default: '',
    comment: '参数名称',
  })
  @IsString()
  configName: string;

  @Column({
    name: 'config_key',
    length: 100,
    default: '',
    comment: '参数键名',
  })
  @IsString()
  configKey: string;

  @Column({
    name: 'config_value',
    length: 500,
    default: '',
    comment: '参数键值',
  })
  @IsString()
  configValue: string;

  @Column({
    name: 'config_type',
    type: 'char',
    length: 1,
    default: 'N',
    comment: '系统内置（Y是 N否）',
  })
  @IsString()
  configType: string;
}

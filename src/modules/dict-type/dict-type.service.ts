import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { DictType } from 'src/entities/dict-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictType)
    private readonly dictTypeRepository: Repository<DictType>,
  ) {}

  /* 新增字典类型 */
  async addOrUpdateType(dictType: DictType) {
    const type = await this.findDictType(dictType.dictType);
    if (type) throw new BusinessException(20001);
    return await this.dictTypeRepository.save(dictType);
  }

  /* 通过字典类型查询 */
  async findDictType(dictType: string) {
    return await this.dictTypeRepository.findOne({
      where: { dictType, status: 0 },
    });
  }

  /* 通过字典id数组删除 */
  async deleteDictType(dictTypeId: number[]) {
    await this.dictTypeRepository.delete(dictTypeId);
  }

  //更新类型
  updateDictType(dictType: DictType) {
    return this.dictTypeRepository.save(dictType);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { DictType } from 'src/entities/dict-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictType)
    private readonly dictTypeRepository: Repository<DictType>,
  ) {}

  /* 新增或者编辑字典类型 */
  async addOrUpdateType(dictType: DictType) {
    const type = await this.findDictType(dictType.dictType);
    if (type) throw new BusinessException(20001);
    await this.dictTypeRepository.save(dictType);
  }

  /* 通过字典类型查询 */
  async findDictType(dictType: string) {
    return await this.dictTypeRepository.findOneBy({ dictType });
  }
}

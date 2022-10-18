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
  async create(dto: DictType) {
    const type = await this.findDictType(dto.dictType);
    if (type) throw new BusinessException(20001);
    return await this.dictTypeRepository.save(dto);
  }

  /* 通过字典类型查询 */
  async findDictType(dictType: string) {
    return await this.dictTypeRepository.findOne({
      where: { dictType, status: 0 },
    });
  }

  //更新类型
  async update(dictTypeId: number, dto: DictType) {
    const dictType = await this.findDictTypeById(dictTypeId);
    return this.dictTypeRepository.save({ ...dictType, ...dto });
  }

  // 根据id查询
  async getDictTypeById(dictTypeId: number) {
    return await this.dictTypeRepository.findOne({
      where: { dictTypeId },
    });
  }

  /* 通过字典id数组删除 */
  async remove(dictTypeId: number) {
    await this.dictTypeRepository.delete(dictTypeId);
  }

  // 根据字典类型id 查询字典类型数据是否存在
  async findDictTypeById(dictTypeId: number) {
    const dictType = this.getDictTypeById(dictTypeId);
    if (isEmpty(dictType)) {
      throw new BusinessException(20003);
    }

    return dictType;
  }

  //分页查询登录日志
  async getDictTypeList(params: { limit: number; page: number }) {
    const { limit, page } = params;
    const db = this.dictTypeRepository
      .createQueryBuilder('dictType')
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }
}

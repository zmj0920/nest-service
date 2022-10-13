import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dict } from 'src/entities/dict.entity';
import { Repository } from 'typeorm';
import { DictTypeService } from '../dict-type/dict-type.service';
import { isEmpty } from 'class-validator';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly dictRepository: Repository<Dict>,
    private dictTypeService: DictTypeService,
  ) {}
  /* 通过 dictType 获取 字典数据(排除停用的)*/
  async getDict(type: string) {
    const dictType = await this.dictTypeService.findDictType(type);

    if (isEmpty(dictType)) {
      return [];
    }

    return this.dictRepository.find({
      where: { dictTypeId: dictType.dictTypeId, status: 0 },
    });
  }

  //查询字典数据列表
  async getDictList(params: { limit: number; page: number }) {
    const { limit, page } = params;
    const db = this.dictRepository
      .createQueryBuilder('dict')
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }

  // 添加字典数据
  async addDict(dict: Dict) {
    this.dictRepository.save(dict);
  }

  async findById(dictId: number) {
    const dict = this.dictRepository.findOne({ where: { dictId } });
    if (isEmpty(dict)) {
      throw new BusinessException(20002);
    }
    return dict;
  }

  // 更新字典数据
  async updateDict(dto: Dict) {
    const dict = await this.findById(dto.dictId);

    this.dictRepository.save({ ...dict, ...dto });
  }
}

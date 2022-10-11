import { Injectable } from '@nestjs/common';
import { CreateDictTypeDto } from './dto/create-dict-type.dto';
import { UpdateDictTypeDto } from './dto/update-dict-type.dto';

@Injectable()
export class DictTypeService {
  create(createDictTypeDto: CreateDictTypeDto) {
    return 'This action adds a new dictType';
  }

  findAll() {
    return `This action returns all dictType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dictType`;
  }

  update(id: number, updateDictTypeDto: UpdateDictTypeDto) {
    return `This action updates a #${id} dictType`;
  }

  remove(id: number) {
    return `This action removes a #${id} dictType`;
  }
}

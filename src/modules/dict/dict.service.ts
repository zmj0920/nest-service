import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@Injectable()
export class DictService {
  create(createDictDto: CreateDictDto) {
    return 'This action adds a new dict';
  }

  findAll() {
    return `This action returns all dict`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dict`;
  }

  update(id: number, updateDictDto: UpdateDictDto) {
    return `This action updates a #${id} dict`;
  }

  remove(id: number) {
    return `This action removes a #${id} dict`;
  }
}

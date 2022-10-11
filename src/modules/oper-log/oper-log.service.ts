import { Injectable } from '@nestjs/common';
import { CreateOperLogDto } from './dto/create-oper-log.dto';
import { UpdateOperLogDto } from './dto/update-oper-log.dto';

@Injectable()
export class OperLogService {
  create(createOperLogDto: CreateOperLogDto) {
    return 'This action adds a new operLog';
  }

  findAll() {
    return `This action returns all operLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operLog`;
  }

  update(id: number, updateOperLogDto: UpdateOperLogDto) {
    return `This action updates a #${id} operLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} operLog`;
  }
}

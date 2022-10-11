import { Injectable } from '@nestjs/common';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { UpdateLoginLogDto } from './dto/update-login-log.dto';

@Injectable()
export class LoginLogService {
  create(createLoginLogDto: CreateLoginLogDto) {
    return 'This action adds a new loginLog';
  }

  findAll() {
    return `This action returns all loginLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loginLog`;
  }

  update(id: number, updateLoginLogDto: UpdateLoginLogDto) {
    return `This action updates a #${id} loginLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} loginLog`;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { camelCase, isEmpty } from 'lodash';
import { User } from 'src/entities/user.entity';
import { EntityManager, In, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * 根据用户名查找已经启用的用户
   */
  async findUserByUserName(): Promise<any> {
    return await this.userRepository.find();
  }
}

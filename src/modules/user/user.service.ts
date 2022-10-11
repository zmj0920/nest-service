import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import UserRole from 'src/entities/user-role.entity';
import { User } from 'src/entities/user.entity';
import { generateRandomValue, md5 } from 'src/shared/utils';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * 根据用户名查找已经启用的用户
   */
  async findUserByUserName(): Promise<any> {
    return await this.userRepository.find();
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   */
  async add(param: any): Promise<void> {
    // const insertData: any = { ...CreateUserDto };
    const exists = await this.userRepository.findOne({
      where: { userName: param.userName },
    });
    if (!isEmpty(exists)) {
      throw new BusinessException(10001);
    }
    // 所有用户初始密码为123456

    await this.entityManager.transaction(async (manager) => {
      const salt = generateRandomValue(32);

      // 查找配置的初始密码

      const password = md5(`${param.password}${salt}`);
      const u = manager.create(User, {
        userName: param.userName,
        name: param.nickName,
        email: param.email,
        phoneNumber: param.phoneNumber,
        sex: param.sex,
        avatar: param.avatar,
        password: password,
        salt: salt,
        status: param.status,
        // loginIp: param.loginIp,
        // loginDate: param.loginDate,
        deptId: param.deptId,
        remark: param.remark,
        createBy: param.createBy,
      });
      const result = await manager.save(u);
      const { roles } = param;
      const insertRoles = roles.map((e) => {
        return {
          roleId: e,
          userId: result.userId,
        };
      });
      // 分配角色
      await manager.insert(UserRole, insertRoles);
    });
  }
}

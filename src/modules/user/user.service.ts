import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import UserRole from 'src/entities/user-role.entity';
import { User } from 'src/entities/user.entity';
import { generateRandomValue, md5 } from 'src/shared/utils';
import { EntityManager, Repository } from 'typeorm';
import { DeptService } from '../dept/dept.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectEntityManager() private entityManager: EntityManager,
    private dept: DeptService,
  ) {}

  /**
   * 根据用户名查找已经启用的用户
   */
  async findUserByUserName(): Promise<any> {
    return await this.userRepository.find();
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   */
  async create(param: any): Promise<void> {
    // const insertData: any = { ...CreateUserDto };
    const exists = await this.userRepository.findOne({
      where: { userName: param.userName },
    });
    if (!isEmpty(exists)) {
      throw new BusinessException(10001);
    }

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

  /* 通过用户名获取用户,排除停用和删除的,用于登录 */
  async getUserInfo(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      // .leftJoinAndSelect('dept', 'dept', 'user.deptId = dept.deptId')
      .select('user.userId')
      .addSelect('user.userName')
      .addSelect('user.name')
      .addSelect('user.password')
      .addSelect('user.salt')
      .addSelect('user.deptId')
      .where({
        userName: username,
        status: '0',
      })
      .getOne();

    const dept = await this.dept.findDept(user.deptId);

    return {
      userId: user.userId,
      name: user.name,
      password: user.password,
      salt: user.salt,
      deptId: user.deptId,
      deptName: dept.deptName,
    };
  }

  //分页查询
  async getUserList(params: { limit: number; page: number }) {
    const { limit, page } = params;
    const db = this.userRepository
      .createQueryBuilder('user')
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }

  //分页查询
  async getDeptIdUserList(params: {
    limit: number;
    page: number;
    deptId: number;
  }) {
    const { limit, page, deptId } = params;
    const db = this.userRepository
      .createQueryBuilder('user')
      .where({
        deptId,
      })
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }

  async findUserById(userId: number) {
    return this.userRepository.findOne({ where: { userId } });
  }

  async update(userId: number, dto: User) {
    const user = await this.findUserById(userId);
    if (isEmpty(user)) {
      throw new BusinessException(11004);
    }
    return this.userRepository.save({ ...user, dto });
  }

  async remove(userId: number) {
    return this.userRepository.delete(userId);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoleMenu from 'src/entities/role-menu.entity';
import { Role } from 'src/entities/role.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
  ) {}

  //创建角色
  create(role: Role) {
    return this.roleRepository.save(role);
  }

  // 更新角色
  update(role: Role) {
    return this.roleRepository.save(role);
  }

  /* 通过id查询 */
  async findById(roleId: number) {
    return this.roleRepository.findOneBy({ roleId });
  }

  // 多个角色
  async findByIds(ids: string[]) {
    return await this.roleRepository.find({
      where: {
        roleId: In(ids),
      },
    });
  }

  remove(roleId: number) {
    return this.roleMenuRepository.delete({
      roleId,
    });
  }

  set(roleId: number, menuIds: number[]) {
    const roleMenus: any[] = menuIds.map((menuId) => {
      return {
        roleId,
        menuId,
      };
    });
    return this.roleMenuRepository.save(roleMenus);
  }
}

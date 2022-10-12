import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dept } from 'src/entities/dept.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { tree } from 'src/shared/utils';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept) private readonly deptRepository: Repository<Dept>,
  ) {}

  /**
   * 根据ID查找部门信息
   */
  async findById(deptId: number) {
    const dept = await this.deptRepository.findOneBy({ deptId });
    let parentDept = null;
    if (dept.parentId) {
      parentDept = await this.deptRepository.findOne({
        where: { deptId: dept.parentId },
      });
    }
    return { dept, parentDept };
  }

  async findDept(deptId: number) {
    const dept = await this.deptRepository.findOneBy({ deptId });
    if (isEmpty(dept)) {
      throw new BusinessException(10019);
    }
    return dept;
  }

  /**
   * 获取所有部门
   */
  async list() {
    return await this.deptRepository.find({ order: { orderNum: 'DESC' } });
  }

  /**
   * 新增部门
   */
  async add(param: Dept) {
    if (param.parentId) {
      await this.findDept(param.parentId);
    }
    return await this.deptRepository.save(param);
  }

  /**
   * 更新部门信息
   */
  async update(param: Dept) {
    if (param.parentId) {
      await this.findDept(param.parentId);
    }
    return await this.deptRepository.save(param);
  }

  /**
   * 根据ID删除部门
   */
  async delete(deptId: number) {
    await this.findDept(deptId);
    return await this.deptRepository.delete(deptId);
  }

  async treeDept() {
    const depts = await this.list();
    return tree(depts, { id: 'deptId' });
  }
}

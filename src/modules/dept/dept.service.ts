import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dept } from 'src/entities/dept.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { tree } from 'src/common/utils';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept) private readonly deptRepository: Repository<Dept>,
  ) {}

  /**
   * 创建部门
   */
  async create(param: Dept) {
    if (param.parentId) {
      await this.findDept(param.parentId);
    }
    return await this.deptRepository.save(param);
  }

  // 树结构部门信息
  async treeDept() {
    const depts = await this.list();
    return tree(depts, { id: 'deptId' });
  }

  /**
   * 获取所有部门
   */
  async list() {
    return await this.deptRepository.find({ order: { orderNum: 'DESC' } });
  }

  /**
   * 更新部门信息
   */
  async update(deptId: number, param: Dept) {
    if (param.parentId) {
      await this.findDept(param.parentId);
    }
    const dept = await this.findDept(deptId);
    return await this.deptRepository.save({ ...dept, ...param });
  }

  /**
   * 根据ID删除部门
   */
  async delete(deptId: number) {
    await this.findDept(deptId);
    return await this.deptRepository.delete(deptId);
  }

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

  // 根据部门id查询数据
  async findDept(deptId: number) {
    const dept = await this.deptRepository.findOneBy({ deptId });
    if (isEmpty(dept)) {
      throw new BusinessException(10019);
    }
    return dept;
  }
}

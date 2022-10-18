import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  create(dto: Post) {
    return this.postRepository.save(dto);
  }

  async update(postId: number, param: Post) {
    const post = await this.findPost(postId);
    return await this.postRepository.save({ ...post, ...param });
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }

  //分页查询岗位列表
  async getPostList(params: { limit: number; page: number }) {
    const { limit, page } = params;
    const db = this.postRepository
      .createQueryBuilder('operLog')
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }

  //根据id查询岗位
  async findPostById(postId: number) {
    return await this.postRepository.findOneBy({ postId });
  }

  // 根据岗位id查询数据
  async findPost(postId: number) {
    const post = await this.postRepository.findOneBy({ postId });
    if (isEmpty(post)) {
      throw new BusinessException(10019);
    }
    return post;
  }
}

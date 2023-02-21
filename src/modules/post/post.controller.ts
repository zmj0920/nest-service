import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Post as Station } from 'src/entities/post.entity';

@ApiTags('岗位模块')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '新增岗位',
  })
  @Post()
  create(@Body() dto: Station) {
    return this.postService.create(dto);
  }

  @ApiOperation({
    summary: '根据postId查询岗位',
  })
  @Get(':postId')
  findOne(@Param('postId') postId: number) {
    return this.postService.findPostById(postId);
  }

  @ApiOperation({
    summary: '分页查询岗位列表',
  })
  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.postService.getPostList({ limit, page });
  }

  @ApiOperation({
    summary: '修改询岗位信息',
  })
  @Patch(':postId')
  update(@Param('postId') postId: number, @Body() dto: Station) {
    return this.postService.update(postId, dto);
  }

  @ApiOperation({
    summary: '删除询岗位信息',
  })
  @Delete(':postId')
  remove(@Param('postId') postId: number) {
    return this.postService.remove(postId);
  }
}

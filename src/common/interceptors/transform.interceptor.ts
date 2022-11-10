import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FastifyReply } from 'fastify';
import { map } from 'rxjs/operators';
import { ResOp } from '../exceptions/http.exception.filter';
import { TRANSFORM_KEEP_KEY_METADATA } from '../contants';

interface Response<T> {
  data: T;
}

/**
 * 统一处理返回接口结果，如果不需要则添加@Keep装饰器
 */
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const keep = this.reflector.get<boolean>(
          TRANSFORM_KEEP_KEY_METADATA,
          context.getHandler(),
        );
        if (keep) {
          return data;
        } else {
          const response = context.switchToHttp().getResponse<FastifyReply>();
          response.header('Content-Type', 'application/json; charset=utf-8');
          return new ResOp(200, data);
        }
      }),
    );
  }
}

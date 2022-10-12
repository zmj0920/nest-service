import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { isDev } from 'src/config/env';
import { BusinessException } from './business.exception.ts';

/**
 * 异常接管，统一异常返回数据
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    // console.log(111);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    // check api exection
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // set json response
    response.header('Content-Type', 'application/json; charset=utf-8');
    // prod env will not return internal error message
    // console.log(status);

    const code =
      exception instanceof BusinessException
        ? (exception as BusinessException).getErrorCode()
        : status;
    let message = '服务器异常，请稍后再试';
    // 开发模式下提示500类型错误，生产模式下屏蔽500内部错误提示
    if (isDev() || status < 500) {
      message =
        exception instanceof HttpException ? exception.message : `${exception}`;
    }
    // 记录 500 日志
    if (status >= 500) {
      // this.logger.error(exception, ResOp.name);
    }
    const result = new ResOp(code, null, message);
    response.status(status).send(result);
  }

  /* 解析错误类型，获取状态码和返回值 */
  errorResult(exception: unknown) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof BusinessException
        ? (exception as BusinessException).getErrorCode()
        : status;

    let message =
      exception instanceof HttpException ? exception.message : `${exception}`;
    const result = new ResOp(code, null, message);
    return {
      status,
      result: result,
    };
  }
}
export class ResOp {
  readonly data: any;
  readonly code: number;
  readonly message: string;

  constructor(code: number, data?: any, message = 'success') {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  static success(data?: any) {
    return new ResOp(200, data);
  }
}

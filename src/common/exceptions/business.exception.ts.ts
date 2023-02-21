import { HttpException } from '@nestjs/common';
import { ErrorCode, ErrorCodeType } from './error-code';

/**
 * Api业务异常均抛出该异常
 */
export class BusinessException extends HttpException {
  /**
   * 业务类型错误代码，非Http code
   */
  private errorCode: ErrorCodeType;

  constructor(errorCode: ErrorCodeType) {
    super(ErrorCode[errorCode], 200);
    this.errorCode = errorCode;
  }

  getErrorCode(): ErrorCodeType {
    return this.errorCode;
  }
}


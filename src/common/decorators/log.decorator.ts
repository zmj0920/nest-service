import { SetMetadata } from '@nestjs/common';
import { BusinessTypeEnum } from 'src/types';
import { LOG_KEY_METADATA } from '../contants';

export class LogOption {
  /* 操作模块 */
  title: string;

  /* 操作功能 */
  type?: BusinessTypeEnum = BusinessTypeEnum.other;

  /* 是否保存请求的参数 */
  isSaveRequestData?: boolean = true;

  /* 是否保存响应的参数 */
  isSaveResponseData?: boolean = true;
}

export const Log = (logOption: LogOption) => {
  const option = Object.assign(new LogOption(), logOption);
  return SetMetadata(LOG_KEY_METADATA, option);
};

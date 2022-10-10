import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import * as iconv from 'iconv-lite';
import { LOG_KEY_METADATA } from '../contants/decorator.contants';
import { LogOption } from '../decorators';
import { getReqIP } from 'src/shared/utils';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly httpService: HttpService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        next: (data) => {
          // console.log(context);

          // console.log(data);
          const a = this.log(context, data);
          // return this.log(context, data);
        },
        error: (e) => {
          console.log(e);

          //   const allExceptionsFilter = new HttpExceptionFilter();
          //   const { result } = allExceptionsFilter.catch(e);
          //   return this.log(context, result);
        },
      }),
    );
  }

  async log(context: ExecutionContext, data: any) {
    const logOption = this.reflector.get<LogOption>(
      LOG_KEY_METADATA,
      context.getHandler(),
    );
    if (!logOption) return;
    console.log(logOption);
    const request = context.switchToHttp().getRequest();

    const method = request.method.toUpperCase();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const url = request.url;

    /* 请求ip */
    const operIp = getReqIP(request);
    console.log(operIp);
    /* 请求地址 */
    const operLocation = await this.getLocation(operIp);
    console.log(operLocation);

    /* 请求参数 */
    if (logOption.isSaveRequestData) {
      const data = {
        params: request.params,
        query: request.query,
        body: request.body,
      };
      // console.log(JSON.stringify(data));
    }

    /* 记录返回值 */
    if (logOption.isSaveResponseData) {
      // console.log(JSON.stringify(data));
    }
  }

  /* 通过ip获取地理位置 */
  async getLocation(ip: string) {
    if (this.IsLAN(ip)) return '内网IP';
    try {
      let { data } = await this.httpService.axiosRef.get(
        `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
        { responseType: 'arraybuffer' },
      );
      console.log(data);

      data = JSON.parse(iconv.decode(data, 'gbk'));
      return data.pro + ' ' + data.city;
    } catch (error) {
      return '未知';
    }
  }

  /* 判断IP是不是内网 */
  IsLAN(ip: string) {
    ip.toLowerCase();
    if (ip == 'localhost') return true;
    let a_ip = 0;
    if (ip == '') return false;
    const aNum = ip.split('.');
    if (aNum.length != 4) return false;
    a_ip += parseInt(aNum[0]) << 24;
    a_ip += parseInt(aNum[1]) << 16;
    a_ip += parseInt(aNum[2]) << 8;
    a_ip += parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xffff;
    return (
      a_ip >> 8 == 0x7f ||
      a_ip >> 8 == 0xa ||
      a_ip == 0xc0a8 ||
      (a_ip >= 0xac10 && a_ip <= 0xac1f)
    );
  }
}

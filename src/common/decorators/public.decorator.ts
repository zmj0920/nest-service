import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../contants';

// 设置不进行 jwt 校验
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


export const PayloadUser = createParamDecorator(
    (data, ctx: ExecutionContext): Payload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

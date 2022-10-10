import { FastifyRequest } from 'fastify';


/**
 * 获取请求IP
 */
export const getReqIP = (req: FastifyRequest): string => {
  return (
    // 判断是否有反向代理 IP
    (
      (req.headers['x-forwarded-for'] as string) ||
      // 判断后端的 socket 的 IP
      req.socket.remoteAddress
    ).replace('::ffff:', '')
  );
};

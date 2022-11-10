import { FastifyRequest } from 'fastify';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';

/* 判断IP是不是内网 */
export const IsLAN = (ip: string) => {
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
};

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

/**
 * AES加密
 */
export const aesEncrypt = (msg: string, secret: string): string => {
  return CryptoJS.AES.encrypt(msg, secret).toString();
};

/**
 * AES解密
 */
export const aesDecrypt = (encrypted: string, secret: string): string => {
  return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
};

/**
 * md5加密
 */
export const md5 = (msg: string): string => {
  return CryptoJS.MD5(msg).toString();
};

/**
 * 生成一个UUID
 */
export const generateUUID = (): string => {
  return nanoid();
};

/**
 * 生成一个随机的值
 */
export const generateRandomValue = (
  length: number,
  placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
): string => {
  const customNanoid = customAlphabet(placeholder, length);
  return customNanoid();
};

// export const tree = (items, id = 'id', value = null, parent = 'parentId') => {
//   return items
//     .filter((item) => item[parent] === value)
//     .map((item) => ({ ...item, children: tree(items, id, item[id]) }));
// };

export const tree = (
  items,
  options: { id?: string; value?: string | null | number; parent?: string },
) => {
  const { id = 'id', value = null, parent = 'parentId' } = options;

  return items
    .filter((item) => item[parent] === value)
    .map((item: any) => ({
      ...item,
      children: tree(items, { id, value: item[id] }),
    }));
};

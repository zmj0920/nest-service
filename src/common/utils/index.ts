import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import { Request } from 'express';

/**
 * 获取请求IP
 */
export const getReqIP = (req: Request): string => {
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

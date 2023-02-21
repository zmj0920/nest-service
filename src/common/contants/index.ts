// @Keep
export const TRANSFORM_KEEP_KEY_METADATA = 'common:transform_keep';

/* 记录日志 */
export const LOG_KEY_METADATA = 'common:log';

/* 开发接口，无需登录,不进行 jwt 校验 */
export const IS_PUBLIC_KEY = 'isPublic';

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: '300s',
};

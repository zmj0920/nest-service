// @Keep
export const TRANSFORM_KEEP_KEY_METADATA = 'common:transform_keep';

/* 记录日志 */
export const LOG_KEY_METADATA = 'common:log';

/* 开发接口，无需登录,不进行 jwt 校验 */
export const PUBLIC_KEY = 'common:publuc';

export const jwtConstants = {
  secret: 'yx-yyds', // 秘钥，不对外公开。
  expiresIn: '300s', // 时效时长
  ignoreExpiration: false, // 是否忽略 token 时效
};

export const USER_TOKEN_KEY = 'admin:user:token'; // 用户token
export const USER_VERSION_KEY = 'admin:user:version'; // 存储版本号
export const USER_ONLINE_KEY = 'admin:online:token'; // 在线用户

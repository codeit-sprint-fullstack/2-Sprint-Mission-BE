export const jwtSecret = process.env.JWT_SECRET;

export const accessExpireTime = process.env.ACCESS_EXPIRE_TIME || '1h';
export const refreshExpireTime = process.env.REFRESH_EXPIRE_TIME || '7d';
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET 환경변수가 설정되지 않았습니다.');
}

export const jwtSecret = process.env.JWT_SECRET;

export const accessExpireTime = process.env.ACCESS_EXPIRE_TIME || '1h';
export const refreshExpireTime = process.env.REFRESH_EXPIRE_TIME || '2w';

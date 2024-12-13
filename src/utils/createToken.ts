import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { accessExpireTime, jwtSecret, refreshExpireTime } from '#configs/jwt.config.js';

export default function createToken(user: User, type: string) {
  const payload = { userId: user.id };
  let options;
  switch (type) {
    case 'access':
      options = { expiresIn: accessExpireTime };
      break;
    case 'refresh':
      options = { expiresIn: refreshExpireTime };
      break;
    default:
  }

  const token = jwt.sign(payload, jwtSecret, options);

  return token;
}

import { User } from '@prisma/client';

export default function filterSensitiveData(data: User) {
  const { password, salt, refreshToken, ...rest } = data;

  return rest;
}

import { AsyncLocalStorage } from 'async_hooks';
import type { NextFunction, Request, Response } from 'express';
import { IStorage } from '#types/common.type.js';
import MESSAGES from '#utils/constants/messages.js';
import { InternalServerError } from '#utils/http-errors.js';

export const asyncLocalStorage = new AsyncLocalStorage<IStorage>();

export const runAsyncLocalStorage = (req: Request, res: Response, next: NextFunction) => {
  const storage: IStorage = {};

  asyncLocalStorage.run(storage, () => {
    res.on('finish', () => {
      asyncLocalStorage.disable();
    });

    res.on('close', () => {
      asyncLocalStorage.disable();
    });

    next();
  });
};
// NOTE 타입 검증하고 간단하게 사용하기 위한 get함수
export const getStorage = (): IStorage => {
  const store = asyncLocalStorage.getStore();
  if (!store) {
    throw new InternalServerError(MESSAGES.INTERNAL_ERROR);
  }

  return store;
};

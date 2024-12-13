import type { Request as expressRequest } from 'express';
import { NextFunction, Response } from 'express-serve-static-core';

export interface Request<T = { params: {}; response: {}; body: {}; query: {} }>
  extends expressRequest<
    T extends { params: infer ParamsType } ? ParamsType : {},
    T extends { response: infer ResponseType } ? ResponseType : {},
    T extends { body: infer BodyType } ? BodyType : {},
    T extends { query: infer QueryType } ? QueryType : {}
  > {
  user?: {
    userId: string;
    exp: number;
    iat: number;
  };
}

export interface RequestHandler<T = { params: {}; response: {}; body: {}; query: {} }> {
  (req: Request<T>, res: Response, next: NextFunction): void | Promise<void>;
}

export interface ErrorRequestHandler<T = { params: {}; response: {}; body: {}; query: {} }> {
  (err: any, req: Request<T>, res: Response, next: NextFunction): void | Promise<void>;
}

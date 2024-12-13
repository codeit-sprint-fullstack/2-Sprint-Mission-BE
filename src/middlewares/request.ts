import type { Request as expressRequest } from 'express';

export interface Request<T = { params: {}; response: {}; body: {}; query: {} }>
  extends expressRequest<
    T extends { params: infer ParamsType } ? ParamsType : {},
    T extends { response: infer ResponseType } ? ResponseType : {},
    T extends { body: infer BodyType } ? BodyType : {},
    T extends { query: infer QueryType } ? QueryType : {}
  > {}

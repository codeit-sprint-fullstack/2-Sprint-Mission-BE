export interface IStorage {
  [key: string]: any;
}

export interface UserToken {
  userId: string;
  exp: number;
  iat: number;
}

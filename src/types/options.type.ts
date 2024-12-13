export interface OffsetPaginationOptions {
  page: number;
  pageSize: number;
}

export interface CursorPaginationOptions {
  cursor: string;
  limit: number;
}

export interface FindOptions extends OffsetPaginationOptions {
  orderBy: string;
  keyword: string;
}

export enum CommentType {
  Article = 'Article',
  Product = 'Product',
}

export interface CommentFindOptions extends CursorPaginationOptions {
  id: string;
  type: CommentType;
}

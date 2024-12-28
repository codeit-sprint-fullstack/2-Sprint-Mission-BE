import { Prisma } from '@prisma/client';

declare global {
  namespace Query {
    export interface Pagination {
      skip?: number;
      take?: number;
    }

    export interface Sorting {
      orderBy?: 'oldest' | 'newest' | 'priceHighest' | 'priceLowest';
    }

    export interface Search {
      keyword?: string;
    }

    export type List = Pagination & Sorting & Search;
  }
}

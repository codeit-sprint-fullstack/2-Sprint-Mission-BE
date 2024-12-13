export interface WhereCondition {
  where?: object;
}

export interface OrderByCondition {
  orderBy?: object;
}

export interface CursorCondition {
  skip?: number;
  cursor?: { id: string };
}

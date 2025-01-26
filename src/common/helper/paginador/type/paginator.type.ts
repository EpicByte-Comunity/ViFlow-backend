export interface ResponseList<T> {
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  limit: number;
  totalDocs: number;
  data: T[];
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

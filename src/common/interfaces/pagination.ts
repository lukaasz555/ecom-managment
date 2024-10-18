import { IPaginationResult } from './pagination-result';

export interface IPagination<T> {
  items: T[];
  page: number;
  limit: number;
  totalRecords: number;
  offset: number;
  setItems(items: T[]): this;
  setPage(page: number): this;
  setLimit(limit: number): this;
  setTotalRecords(totalRecords: number): this;
  setTotalPages(): this;
  getDataFromQuery(query: Record<string, string>): void;
  getPaginationResult(): IPaginationResult<T>;
}

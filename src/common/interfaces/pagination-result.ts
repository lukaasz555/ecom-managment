export interface IPaginationResult<T> {
  meta: {
    totalRecords: number;
    totalPages: number;
    page: number;
    limit: number;
  };
  items: T[];
}

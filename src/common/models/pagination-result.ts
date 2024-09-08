export class PaginationResult<T> {
  items: T[];
  page = 1;
  limit = 10;
  offset = 0;
  totalRecords = 0;
  totalPages = 0;

  setItems(items: T[]) {
    this.items = items;
    return this;
  }

  setPage(page: number) {
    this.page = page;
    return this;
  }

  setLimit(limit: number) {
    this.limit = limit;
    return this;
  }

  setOffset(offset: number) {
    this.offset = offset;
    return this;
  }

  setTotalRecords(totalRecords: number) {
    this.totalRecords = totalRecords;
    return this;
  }

  setTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.limit);
    return this;
  }
}

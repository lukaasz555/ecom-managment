export class PaginationData<T> {
  items: T[];
  page = 1;
  limit = 10;
  private _offset = 0;
  totalRecords = 0;
  private _totalPages = 0;
  search = '';

  constructor(page?: number, limit?: number) {
    this.setPage(page || 1);
    this.setLimit(limit || 10);
  }

  setItems(items: T[]) {
    this.items = items;
    return this;
  }

  setPage(page: number) {
    this.page = page;
    this._setOffset();
    return this;
  }

  setLimit(limit: number) {
    this.limit = limit;
    this.setTotalPages();
    this._setOffset();
    return this;
  }

  setTotalRecords(totalRecords: number) {
    this.totalRecords = totalRecords;
    return this;
  }

  setTotalPages() {
    this._totalPages = Math.ceil(this.totalRecords / this.limit);
    return this;
  }

  setSearch(search: string) {
    this.search = search;
    return this;
  }

  getDataFromQuery(query: Record<string, string>): void {
    if (query.page) {
      this.setPage(parseInt(query.page));
    }
    if (query.limit) {
      this.setLimit(parseInt(query.limit));
    }
    if (query.search) {
      this.setSearch(query.search);
    }
  }

  get offset() {
    return this._offset;
  }

  private _setOffset() {
    this._offset = (this.page - 1) * this.limit || 0;
    return this;
  }
}

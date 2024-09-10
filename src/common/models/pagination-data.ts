import { IPagination } from '../interfaces';

export class PaginationData<T> implements IPagination<T> {
  items: T[];
  page = 1;
  limit = 10;
  totalRecords = 0;
  private _offset = 0;
  private _totalPages = 0;

  constructor(page?: number, limit?: number) {
    this.setPage(page || 1);
    this.setLimit(limit || 10);
  }

  get offset() {
    return this._offset;
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

  getDataFromQuery(query: Record<string, string>): void {
    if (query.page) {
      this.setPage(parseInt(query.page));
    }
    if (query.limit) {
      this.setLimit(parseInt(query.limit));
    }
  }

  private _setOffset() {
    this._offset = (this.page - 1) * this.limit || 0;
    return this;
  }
}

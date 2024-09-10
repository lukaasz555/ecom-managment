import { PaginationData } from '@src/common/models';
import { ProductDto } from '../dto';
import { ISearchable, ISortable } from '@src/common/interfaces';

export class ProductsPagination
  extends PaginationData<ProductDto>
  implements ISortable, ISearchable
{
  categoryId?: number | undefined;
  sortBy?: string | undefined;
  sortDesc?: boolean | undefined;
  search: string = '';

  constructor(page?: number, limit?: number) {
    super(page, limit);
  }

  setSortBy(sortBy: string): this {
    this.sortBy = sortBy;
    return this;
  }

  setSortDesc(sortDesc: boolean): this {
    this.sortDesc = sortDesc;
    return this;
  }

  setSearch(search: string): this {
    this.search = search;
    return this;
  }

  setCategoryId(categoryId: number): this {
    this.categoryId = categoryId;
    return this;
  }
}

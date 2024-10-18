import { IPrismaQueryBuilder } from '@src/common/interfaces/prisma-query-builder';
import { ISearchable } from '@src/common/interfaces/searchable';
import { ISortable } from '@src/common/interfaces/sortable';
import { PaginationData } from '@src/common/models/pagination-data';
import { PrismaQuery } from '@src/common/types/prisma-query';
import { ProductDto } from '../dto/product.dto';

export class ProductsPagination
  extends PaginationData<ProductDto>
  implements ISortable, ISearchable, IPrismaQueryBuilder
{
  categoriesIds: number[] = [];
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

  setCategoriesIds(categoriesIds: number[]): this {
    this.categoriesIds = categoriesIds;
    return this;
  }

  getDataFromQuery(query: Record<string, string>): void {
    if (query.page && !isNaN(parseInt(query.page))) {
      this.setPage(parseInt(query.page));
    }
    if (query.limit && !isNaN(parseInt(query.limit))) {
      this.setLimit(parseInt(query.limit));
    }
    if (query.categories) {
      const categoriesIds = query.categories
        .split(',')
        .filter((x) => {
          if (!isNaN(parseInt(x))) {
            return x;
          }
        })
        .map((y) => parseInt(y));
      this.setCategoriesIds(categoriesIds);
    }
  }

  buildPrismaQuery(): PrismaQuery {
    const where = {};

    if (this.categoriesIds.length) {
      Object.assign(where, {
        categoryId: {
          in: this.categoriesIds,
        },
      });
    }

    return { skip: this.offset, take: this.limit, where };
  }
}

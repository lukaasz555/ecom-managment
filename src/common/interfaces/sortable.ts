export interface ISortable {
  sortBy?: string;
  sortDesc?: boolean;

  setSortBy(sortBy: string): this;
  setSortDesc(sortDesc: boolean): this;
}

import { Category } from '@prisma/client';

export class CategoryDto {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly parentId: number | null;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.parentId = category.parentId;
  }
}

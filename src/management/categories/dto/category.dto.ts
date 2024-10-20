import { Category } from '@prisma/client';

export class CategoryDto {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly parentId: number | null;
  children: CategoryDto[] = [];
  parent: CategoryDto | null = null;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description ?? undefined;
    this.parentId = category.parentId;
  }

  setParent(parent: CategoryDto) {
    this.parent = parent;
  }

  setChildren(children: CategoryDto[]) {
    this.children = children;
  }
}

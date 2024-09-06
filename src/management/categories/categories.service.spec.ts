import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '@src/singleton';
import { CategoriesController } from './categories.controller';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';
import { PermissionsGuard } from '../guards/permissions-guard';
import { Category } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

const testCategories: Category[] = [
  {
    id: 1,
    name: 'Category #1',
    parentId: null,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Category #2',
    parentId: null,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 10,
    name: 'Category #10',
    parentId: 1,
    description: 'nested in #1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 99,
    name: 'Category #99',
    parentId: null,
    description: 'deleted category',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: ManagementPermissionsService,
          useValue: {},
        },
        {
          provide: PermissionsGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
      controllers: [CategoriesController],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('categoriesService should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return only root & not deleted categories', async () => {
      prismaMock.category.findMany.mockResolvedValue(
        testCategories.filter((c) => !c.parentId && !c.deletedAt),
      );

      const categories = await categoriesService.getCategories();
      const expectedCategories = testCategories.filter(
        (c) => !c.parentId && !c.deletedAt,
      );

      expect(categories.length).toEqual(expectedCategories.length);
      expect(categories.map((c) => c.id)).toEqual(
        expectedCategories.map((c) => c.id),
      );
    });
  });

  describe('getCategory', () => {
    it('should return category with parentId', async () => {
      const firstCategoryWithParentId = testCategories.find((c) => c.parentId);
      if (!firstCategoryWithParentId) {
        throw new Error('No category with parentId found');
      }

      prismaMock.category.findUnique.mockResolvedValue(
        firstCategoryWithParentId,
      );

      const category = await categoriesService.getCategory(
        firstCategoryWithParentId.id,
      );
      expect(category.parentId).toBeTruthy();
      expect(category.id).toEqual(firstCategoryWithParentId.id);
    });
  });

  describe('deleteCategory', () => {
    it('should throw NOT_FOUND if the category does not exist', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(categoriesService.deleteCategory(999)).rejects.toThrowError(
        new HttpException('Category not found', HttpStatus.NOT_FOUND),
      );

      expect(prismaMock.category.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
        include: { children: true },
      });
    });

    it('should throw CONFLICT if the category has children', async () => {
      const firstCategoryWithParentId = testCategories.find((c) => c.parentId);
      if (!firstCategoryWithParentId) {
        throw new Error('No category with parentId found');
      }

      const parentCategory = testCategories.find(
        (c) => c.id === firstCategoryWithParentId.parentId,
      );
      if (!parentCategory) {
        throw new Error('No parent category found');
      }

      prismaMock.category.findUnique.mockResolvedValue({
        ...parentCategory,
        children: [firstCategoryWithParentId],
      } as unknown as Category);

      const category = await categoriesService.getCategory(parentCategory.id);
      const nestedCategoriesNames =
        category?.children?.map((category) => category.name).join(', ') ?? '';

      await expect(
        categoriesService.deleteCategory(parentCategory.id),
      ).rejects.toThrow(
        new HttpException(
          `Category has nested categories: ${nestedCategoriesNames}`,
          409,
        ),
      );
    });
  });
});

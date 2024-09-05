import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '@src/singleton';
import { CategoriesController } from './categories.controller';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';
import { PermissionsGuard } from '../guards/permissions-guard';
import { Category } from '@prisma/client';

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
    it('should return all root categories', async () => {
      prismaMock.category.findMany.mockResolvedValue(
        testCategories.filter((c) => !c.deletedAt && !c.parentId),
      );
      const categories = await categoriesService.getCategories();
      const allCategoriesAreRoot = categories.every((c) => !c.parentId);
      expect(allCategoriesAreRoot).toBe(true);
      expect(categories).toEqual(
        testCategories.filter((c) => !c.deletedAt && !c.parentId),
      );
    });
  });
});

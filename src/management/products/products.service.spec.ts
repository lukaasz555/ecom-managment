import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';
import { CategoriesService } from '../categories/categories.service';
import { PermissionsGuard } from '../guards/permissions-guard';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '@src/singleton';
import { mockProducts } from './data/mock-products';
import { ProductDto } from './dto';
import { PaginationData } from '@src/common/models';

function returnMockPaginationData(page: number, limit: number): ProductDto[] {
  const start = (page - 1) * limit;
  const end = start + limit;
  return mockProducts.slice(start, end);
}

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        ManagementPermissionsService,
        ProductsService,
        {
          provide: PermissionsGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('productsService should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const paginationData = new PaginationData<ProductDto>();
      paginationData.getDataFromQuery({ page: '1', limit: '5' });

      const mockCount = mockProducts.length;
      const mockItems = returnMockPaginationData(
        paginationData.page,
        paginationData.limit,
      );

      prismaMock.$transaction.mockResolvedValueOnce([mockItems, mockCount]);

      const result = await productsService.getProducts(paginationData);

      expect(result.items.length).toBeLessThanOrEqual(paginationData.limit);
      expect(result.totalRecords).toBe(mockCount);
      expect(result.items[0]).toBeInstanceOf(ProductDto);
      expect(result.page).toBe(paginationData.page);
      expect(result.limit).toBe(paginationData.limit);
    });
  });
});

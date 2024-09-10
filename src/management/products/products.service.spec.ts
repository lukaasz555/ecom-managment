import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';
import { CategoriesService } from '../categories/categories.service';
import { PermissionsGuard } from '../guards/permissions-guard';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '@src/singleton';
import { mockProducts } from './data/mock-products';
import { CreateProductDto, ProductDto } from './dto';
import { PaginationData } from '@src/common/models';
import { Product } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

function returnMockPaginationData(page: number, limit: number): ProductDto[] {
  const start = (page - 1) * limit;
  const end = start + limit;
  return mockProducts.slice(start, end);
}

describe('ProductsService', () => {
  let productsService: ProductsService;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            isCategoryExists: jest.fn(),
          },
        },
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
    categoriesService = module.get<CategoriesService>(CategoriesService);
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

  describe('getProduct', () => {
    it('should throw not found', async () => {
      prismaMock.product.findUnique.mockResolvedValueOnce(null);
      await expect(productsService.getProduct(0)).rejects.toThrow(
        new HttpException('Product not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should return a product', async () => {
      const firstMockProduct = mockProducts[0];

      prismaMock.product.findUnique.mockResolvedValueOnce(
        firstMockProduct as unknown as Product,
      );
      const result = await productsService.getProduct(firstMockProduct.id);
      expect(result).toBeInstanceOf(ProductDto);
    });
  });

  describe('createProduct', () => {
    it('should throw bad request', async () => {
      const newProductDto = new CreateProductDto();
      newProductDto.title = 'test';
      newProductDto.categoryId = 0;

      (categoriesService.isCategoryExists as jest.Mock).mockResolvedValueOnce(
        false,
      );

      prismaMock.product.findUnique.mockResolvedValueOnce(null);
      await expect(
        productsService.createProduct(newProductDto),
      ).rejects.toThrow(
        new HttpException('Invalid categoryId', HttpStatus.BAD_REQUEST),
      );
    });

    it('should create a product', async () => {
      const createProductDto = new CreateProductDto();
      createProductDto.title = 'test1';
      createProductDto.categoryId = 5;

      (categoriesService.isCategoryExists as jest.Mock).mockResolvedValueOnce(
        true,
      );

      prismaMock.product.create.mockResolvedValueOnce({
        ...createProductDto,
        id: 777,
      } as unknown as Product);
      const result = await productsService.createProduct(createProductDto);
      expect(result.id).toBeDefined();
      expect(result).toBeInstanceOf(ProductDto);
    });
  });
});

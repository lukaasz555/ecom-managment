import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';
import { CategoriesService } from '../categories/categories.service';
import { PermissionsGuard } from '../guards/permissions-guard';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '@src/singleton';

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
});

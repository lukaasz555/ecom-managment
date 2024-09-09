import { CreateCategoryDto } from '@src/management/categories/dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto extends CreateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

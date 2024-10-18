import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export class UpdateProductDto extends CreateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

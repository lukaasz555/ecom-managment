import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  id: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  parentCategoryId?: number;
}

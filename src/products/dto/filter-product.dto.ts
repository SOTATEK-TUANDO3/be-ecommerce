import { IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  limit?: number;

  @IsOptional()
  @IsString()
  skip?: number;
}

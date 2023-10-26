import { IsOptional, IsString, Matches } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Matches(/^\d+$/)
  limit?: string;

  @IsOptional()
  @Matches(/^\d+$/)
  skip?: string;
}

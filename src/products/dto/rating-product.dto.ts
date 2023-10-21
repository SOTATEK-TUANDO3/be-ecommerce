import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratingNumber: number;
}

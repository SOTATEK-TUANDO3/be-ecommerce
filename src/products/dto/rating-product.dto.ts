import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratingNumber: number;
}

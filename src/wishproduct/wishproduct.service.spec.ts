import { Test, TestingModule } from '@nestjs/testing';
import { WishproductService } from './wishproduct.service';

describe('WishproductService', () => {
  let service: WishproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishproductService],
    }).compile();

    service = module.get<WishproductService>(WishproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WishproductController } from './wishproduct.controller';

describe('WishproductController', () => {
  let controller: WishproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishproductController],
    }).compile();

    controller = module.get<WishproductController>(WishproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

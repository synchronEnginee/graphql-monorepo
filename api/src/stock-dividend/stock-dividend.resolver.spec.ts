import { Test, TestingModule } from '@nestjs/testing';
import { StockDividendResolver } from './stock-dividend.resolver';

describe('StockDividendResolver', () => {
  let resolver: StockDividendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockDividendResolver],
    }).compile();

    resolver = module.get<StockDividendResolver>(StockDividendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import {
  InputType,
  Resolver,
  Field,
  Args,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { StockDividend } from './stock-dividend/stock-dividend';

@InputType()
export class StockDividendCreateInput {
  @Field()
  date: Date;

  @Field()
  dividend: number;
}

@Resolver(StockDividend)
export class StockDividendResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => StockDividend, { nullable: true })
  getStockDividendById(
    @Args('stockId') stockId: number,
    @Args('userId') userId: number,
    @Args('date') date: Date,
  ) {
    return this.prismaService.stockDividend.findUnique({
      where: { stockId_date_userId: { stockId, userId, date } },
    });
  }

  @Mutation((returns) => StockDividend)
  createStockDividend(
    @Args('data') data: StockDividendCreateInput,
    @Args('userId') userId: number,
    @Args('stockId') stockId: number,
  ) {
    return this.prismaService.stockDividend.create({
      data: {
        stock: {
          connect: { id: stockId },
        },
        date: data.date,
        dividend: data.dividend,
        user: {
          connect: { id: userId },
        },
      },
    });
  }
}

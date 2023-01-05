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
import { Stock } from './stock/stock';

@InputType()
export class StockCreateInput {
  @Field()
  id: number;

  @Field()
  name: string;
}

@Resolver(Stock)
export class StockResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => Stock, { nullable: true })
  getStockById(@Args('id') id: number) {
    return this.prismaService.stock.findUnique({ where: { id } });
  }

  @Mutation((returns) => Stock)
  createStock(@Args('data') data: StockCreateInput) {
    return this.prismaService.stock.create({
      data: {
        id: data.id,
        name: data.name,
      },
    });
  }
}

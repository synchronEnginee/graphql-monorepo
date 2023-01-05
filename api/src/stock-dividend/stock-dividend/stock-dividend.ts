import { Field, Int, ID, ObjectType } from '@nestjs/graphql';

import { User } from 'src/user/user/user';
import { Stock } from 'src/stock/stock/stock';

@ObjectType()
export class StockDividend {
  @Field((type) => Stock, { nullable: true })
  stock: Stock | null;

  @Field(() => ID)
  stockId: number;

  @Field((type) => Date)
  date: Date;

  @Field((type) => User, { nullable: true })
  user: User | null;

  @Field((type) => ID)
  userId: number;

  @Field((type) => Int)
  dividend: number;
}

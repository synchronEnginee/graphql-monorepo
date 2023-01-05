import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Stock {
  @Field(() => ID)
  id: number;

  @Field((type) => String)
  name: string;
}

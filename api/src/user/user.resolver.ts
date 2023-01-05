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
import { User } from './user/user';

// @InputType()
// export class UserCreateInput {
//   @Field()
//   name: string;
// }

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id') id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  @Mutation((returns) => User)
  createUser(@Args('name') data: string) {
    return this.prismaService.user.create({
      data: {
        name: data,
      },
    });
  }
}

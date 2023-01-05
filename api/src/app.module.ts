import { UserResolver } from './user/user.resolver';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StockResolver } from './stock/stock.resolver';
import { StockDividendResolver } from './stock-dividend/stock-dividend.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [
    AppService,
    PrismaService,
    UserResolver,
    StockResolver,
    StockDividendResolver,
  ],
})
export class AppModule {}

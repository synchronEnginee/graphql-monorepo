/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query GetStockDividendById($stockId: Float!, $userId: Float!, $date: DateTime!) {\n  getStockDividendById(stockId: $stockId, userId: $userId, date: $date) {\n    stockId\n    userId\n    date\n    dividend\n  }\n}\n\nmutation CreateStockDividend($data: StockDividendCreateInput!, $userId: Float!, $stockId: Float!) {\n  createStockDividend(data: $data, userId: $userId, stockId: $stockId) {\n    stockId\n    userId\n    date\n    dividend\n  }\n}": types.GetStockDividendByIdDocument,
    "query GetStockById($id: Float!) {\n  getStockById(id: $id) {\n    id\n    name\n  }\n}\n\nmutation createStock($data: StockCreateInput!) {\n  createStock(data: $data) {\n    id\n    name\n  }\n}": types.GetStockByIdDocument,
    "query GetUserById($id: Float!) {\n  getUserById(id: $id) {\n    id\n    name\n  }\n}\n\nmutation CreateUser($name: String!) {\n  createUser(name: $name) {\n    id\n    name\n  }\n}": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetStockDividendById($stockId: Float!, $userId: Float!, $date: DateTime!) {\n  getStockDividendById(stockId: $stockId, userId: $userId, date: $date) {\n    stockId\n    userId\n    date\n    dividend\n  }\n}\n\nmutation CreateStockDividend($data: StockDividendCreateInput!, $userId: Float!, $stockId: Float!) {\n  createStockDividend(data: $data, userId: $userId, stockId: $stockId) {\n    stockId\n    userId\n    date\n    dividend\n  }\n}"): (typeof documents)["query GetStockDividendById($stockId: Float!, $userId: Float!, $date: DateTime!) {\n  getStockDividendById(stockId: $stockId, userId: $userId, date: $date) {\n    stockId\n    userId\n    date\n    dividend\n  }\n}\n\nmutation CreateStockDividend($data: StockDividendCreateInput!, $userId: Float!, $stockId: Float!) {\n  createStockDividend(data: $data, userId: $userId, stockId: $stockId) {\n    stockId\n    userId\n    date\n    dividend\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetStockById($id: Float!) {\n  getStockById(id: $id) {\n    id\n    name\n  }\n}\n\nmutation createStock($data: StockCreateInput!) {\n  createStock(data: $data) {\n    id\n    name\n  }\n}"): (typeof documents)["query GetStockById($id: Float!) {\n  getStockById(id: $id) {\n    id\n    name\n  }\n}\n\nmutation createStock($data: StockCreateInput!) {\n  createStock(data: $data) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserById($id: Float!) {\n  getUserById(id: $id) {\n    id\n    name\n  }\n}\n\nmutation CreateUser($name: String!) {\n  createUser(name: $name) {\n    id\n    name\n  }\n}"): (typeof documents)["query GetUserById($id: Float!) {\n  getUserById(id: $id) {\n    id\n    name\n  }\n}\n\nmutation CreateUser($name: String!) {\n  createUser(name: $name) {\n    id\n    name\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
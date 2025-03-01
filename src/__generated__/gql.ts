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
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetCharacter($id: ID!) {\n  character(id: $id) {\n    name\n    gender\n    image\n    species\n    status\n    origin {\n      name\n    }\n    lastLocation: location {\n      name\n    }\n    episode {\n      id\n      name\n      air_date\n      episode\n    }\n  }\n}": typeof types.GetCharacterDocument,
    "query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      ...PaginationInfo\n    }\n    results {\n      ...TableCharacter\n    }\n  }\n}\n\nfragment PaginationInfo on Info {\n  count\n  totalPages: pages\n  next\n  prev\n}\n\nfragment TableCharacter on Character {\n  id\n  name\n  image\n}": typeof types.GetCharactersDocument,
};
const documents: Documents = {
    "query GetCharacter($id: ID!) {\n  character(id: $id) {\n    name\n    gender\n    image\n    species\n    status\n    origin {\n      name\n    }\n    lastLocation: location {\n      name\n    }\n    episode {\n      id\n      name\n      air_date\n      episode\n    }\n  }\n}": types.GetCharacterDocument,
    "query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      ...PaginationInfo\n    }\n    results {\n      ...TableCharacter\n    }\n  }\n}\n\nfragment PaginationInfo on Info {\n  count\n  totalPages: pages\n  next\n  prev\n}\n\nfragment TableCharacter on Character {\n  id\n  name\n  image\n}": types.GetCharactersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCharacter($id: ID!) {\n  character(id: $id) {\n    name\n    gender\n    image\n    species\n    status\n    origin {\n      name\n    }\n    lastLocation: location {\n      name\n    }\n    episode {\n      id\n      name\n      air_date\n      episode\n    }\n  }\n}"): (typeof documents)["query GetCharacter($id: ID!) {\n  character(id: $id) {\n    name\n    gender\n    image\n    species\n    status\n    origin {\n      name\n    }\n    lastLocation: location {\n      name\n    }\n    episode {\n      id\n      name\n      air_date\n      episode\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      ...PaginationInfo\n    }\n    results {\n      ...TableCharacter\n    }\n  }\n}\n\nfragment PaginationInfo on Info {\n  count\n  totalPages: pages\n  next\n  prev\n}\n\nfragment TableCharacter on Character {\n  id\n  name\n  image\n}"): (typeof documents)["query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      ...PaginationInfo\n    }\n    results {\n      ...TableCharacter\n    }\n  }\n}\n\nfragment PaginationInfo on Info {\n  count\n  totalPages: pages\n  next\n  prev\n}\n\nfragment TableCharacter on Character {\n  id\n  name\n  image\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
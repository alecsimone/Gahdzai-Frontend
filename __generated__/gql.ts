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
 */
const documents = {
    "\n  query GET_CANDLES_FOR_SYMBOLS_QUERY(\n    $symbols: [String!]!\n    $symbolType: String!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getCandlesForSymbols(\n      symbols: $symbols\n      symbolType: $symbolType\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n": types.Get_Candles_For_Symbols_QueryDocument,
    "\n  query GET_INDEX_DATA_QUERY(\n    $symbols: [String!]!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getIndexData(\n      symbols: $symbols\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n": types.Get_Index_Data_QueryDocument,
    "\n  query GET_CANDLES_QUERY(\n    $symbol: String!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getCandles(symbol: $symbol, from: $from, to: $to, resolution: $resolution) {\n      open\n      close\n      high\n      low\n      volume\n      time\n    }\n  }\n": types.Get_Candles_QueryDocument,
    "\n  query GET_INDEX_DATA_QUERY_OLD(\n    $symbols: [String!]!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getIndexData(\n      symbols: $symbols\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n": types.Get_Index_Data_Query_OldDocument,
    "\n  mutation LOG_OUT_MUTATION {\n    logOut\n  }\n": types.Log_Out_MutationDocument,
    "\n  fragment MemberBoxFields on User {\n    displayName\n    avatar\n  }\n": types.MemberBoxFieldsFragmentDoc,
    "\n  query MEMBER_BOX_QUERY {\n    currentUser {\n      ...MemberBoxFields\n    }\n  }\n": types.Member_Box_QueryDocument,
    "\n  mutation LOG_IN_MUTATION($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      success\n      message\n    }\n  }\n": types.Log_In_MutationDocument,
    "\n  mutation SIGN_UP_MUTATION(\n    $displayName: String!\n    $email: String!\n    $password: String!\n  ) {\n    createUser(displayName: $displayName, email: $email, password: $password) {\n      id\n      email\n      displayName\n    }\n  }\n": types.Sign_Up_MutationDocument,
    "\n  query INITIAL_MEMBER_QUERY {\n    currentUser {\n      id\n      role\n      ...MemberBoxFields\n    }\n  }\n": types.Initial_Member_QueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GET_CANDLES_FOR_SYMBOLS_QUERY(\n    $symbols: [String!]!\n    $symbolType: String!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getCandlesForSymbols(\n      symbols: $symbols\n      symbolType: $symbolType\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n"): (typeof documents)["\n  query GET_CANDLES_FOR_SYMBOLS_QUERY(\n    $symbols: [String!]!\n    $symbolType: String!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getCandlesForSymbols(\n      symbols: $symbols\n      symbolType: $symbolType\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GET_INDEX_DATA_QUERY(\n    $symbols: [String!]!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getIndexData(\n      symbols: $symbols\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n"): (typeof documents)["\n  query GET_INDEX_DATA_QUERY(\n    $symbols: [String!]!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getIndexData(\n      symbols: $symbols\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GET_CANDLES_QUERY(\n    $symbol: String!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getCandles(symbol: $symbol, from: $from, to: $to, resolution: $resolution) {\n      open\n      close\n      high\n      low\n      volume\n      time\n    }\n  }\n"): (typeof documents)["\n  query GET_CANDLES_QUERY(\n    $symbol: String!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getCandles(symbol: $symbol, from: $from, to: $to, resolution: $resolution) {\n      open\n      close\n      high\n      low\n      volume\n      time\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GET_INDEX_DATA_QUERY_OLD(\n    $symbols: [String!]!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getIndexData(\n      symbols: $symbols\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n"): (typeof documents)["\n  query GET_INDEX_DATA_QUERY_OLD(\n    $symbols: [String!]!\n    $from: String!\n    $to: String!\n    $resolution: String!\n  ) {\n    getIndexData(\n      symbols: $symbols\n      from: $from\n      to: $to\n      resolution: $resolution\n    ) {\n      symbol\n      candles {\n        open\n        close\n        high\n        low\n        volume\n        time\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LOG_OUT_MUTATION {\n    logOut\n  }\n"): (typeof documents)["\n  mutation LOG_OUT_MUTATION {\n    logOut\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MemberBoxFields on User {\n    displayName\n    avatar\n  }\n"): (typeof documents)["\n  fragment MemberBoxFields on User {\n    displayName\n    avatar\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MEMBER_BOX_QUERY {\n    currentUser {\n      ...MemberBoxFields\n    }\n  }\n"): (typeof documents)["\n  query MEMBER_BOX_QUERY {\n    currentUser {\n      ...MemberBoxFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LOG_IN_MUTATION($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation LOG_IN_MUTATION($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SIGN_UP_MUTATION(\n    $displayName: String!\n    $email: String!\n    $password: String!\n  ) {\n    createUser(displayName: $displayName, email: $email, password: $password) {\n      id\n      email\n      displayName\n    }\n  }\n"): (typeof documents)["\n  mutation SIGN_UP_MUTATION(\n    $displayName: String!\n    $email: String!\n    $password: String!\n  ) {\n    createUser(displayName: $displayName, email: $email, password: $password) {\n      id\n      email\n      displayName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query INITIAL_MEMBER_QUERY {\n    currentUser {\n      id\n      role\n      ...MemberBoxFields\n    }\n  }\n"): (typeof documents)["\n  query INITIAL_MEMBER_QUERY {\n    currentUser {\n      id\n      role\n      ...MemberBoxFields\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
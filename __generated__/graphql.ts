/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Candle = {
  __typename?: 'Candle';
  close: Scalars['String']['output'];
  high: Scalars['String']['output'];
  low: Scalars['String']['output'];
  open: Scalars['String']['output'];
  time: Scalars['String']['output'];
  volume?: Maybe<Scalars['String']['output']>;
};

export type CandleSet = {
  __typename?: 'CandleSet';
  candles: Array<Candle>;
  symbol: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  logIn: SuccessMessage;
  logOut?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateUserArgs = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLogInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type PercentageChangeValue = {
  __typename?: 'PercentageChangeValue';
  percentageChange: Scalars['Float']['output'];
  time: Scalars['String']['output'];
};

export type PercentageChanges = {
  __typename?: 'PercentageChanges';
  latestValue: Scalars['Float']['output'];
  previousClose: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
  values: Array<PercentageChangeValue>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getCandlesForSymbols: Array<CandleSet>;
};


export type QueryCurrentUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCandlesForSymbolsArgs = {
  from: Scalars['String']['input'];
  symbolType: Scalars['String']['input'];
  symbols: Array<Scalars['String']['input']>;
  timespan: Timespan;
  timespanMultiplier: Scalars['Int']['input'];
  to: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export enum Timespan {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
  Month = 'month',
  Quarter = 'quarter',
  Second = 'second',
  Week = 'week',
  Year = 'year'
}

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Get_Candles_For_Symbols_QueryQueryVariables = Exact<{
  symbols: Array<Scalars['String']['input']> | Scalars['String']['input'];
  symbolType: Scalars['String']['input'];
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
  timespan: Timespan;
  timespanMultiplier: Scalars['Int']['input'];
}>;


export type Get_Candles_For_Symbols_QueryQuery = { __typename?: 'Query', getCandlesForSymbols: Array<{ __typename?: 'CandleSet', symbol: string, candles: Array<{ __typename?: 'Candle', open: string, close: string, high: string, low: string, volume?: string | null, time: string }> }> };

export type Log_Out_MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type Log_Out_MutationMutation = { __typename?: 'Mutation', logOut?: string | null };

export type MemberBoxFieldsFragment = { __typename?: 'User', displayName?: string | null, avatar?: string | null } & { ' $fragmentName'?: 'MemberBoxFieldsFragment' };

export type Member_Box_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Member_Box_QueryQuery = { __typename?: 'Query', currentUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'MemberBoxFieldsFragment': MemberBoxFieldsFragment } }
  ) | null };

export type Log_In_MutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Log_In_MutationMutation = { __typename?: 'Mutation', logIn: { __typename?: 'SuccessMessage', success?: boolean | null, message?: string | null } };

export type Sign_Up_MutationMutationVariables = Exact<{
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Sign_Up_MutationMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: string | null, email?: string | null, displayName?: string | null } | null };

export type Initial_Member_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Initial_Member_QueryQuery = { __typename?: 'Query', currentUser?: (
    { __typename?: 'User', id?: string | null, role?: Role | null }
    & { ' $fragmentRefs'?: { 'MemberBoxFieldsFragment': MemberBoxFieldsFragment } }
  ) | null };

export const MemberBoxFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberBoxFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<MemberBoxFieldsFragment, unknown>;
export const Get_Candles_For_Symbols_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_CANDLES_FOR_SYMBOLS_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbolType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timespan"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Timespan"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timespanMultiplier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCandlesForSymbols"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"symbols"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}}},{"kind":"Argument","name":{"kind":"Name","value":"symbolType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbolType"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"timespan"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timespan"}}},{"kind":"Argument","name":{"kind":"Name","value":"timespanMultiplier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timespanMultiplier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"candles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}}]}}]} as unknown as DocumentNode<Get_Candles_For_Symbols_QueryQuery, Get_Candles_For_Symbols_QueryQueryVariables>;
export const Log_Out_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOG_OUT_MUTATION"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"}}]}}]} as unknown as DocumentNode<Log_Out_MutationMutation, Log_Out_MutationMutationVariables>;
export const Member_Box_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MEMBER_BOX_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberBoxFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberBoxFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<Member_Box_QueryQuery, Member_Box_QueryQueryVariables>;
export const Log_In_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOG_IN_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Log_In_MutationMutation, Log_In_MutationMutationVariables>;
export const Sign_Up_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SIGN_UP_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"displayName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<Sign_Up_MutationMutation, Sign_Up_MutationMutationVariables>;
export const Initial_Member_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"INITIAL_MEMBER_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberBoxFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberBoxFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<Initial_Member_QueryQuery, Initial_Member_QueryQueryVariables>;
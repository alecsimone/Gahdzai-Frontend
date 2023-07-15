import {
  ApolloCache,
  FetchResult,
  MutationFunctionOptions,
  DefaultContext,
} from '@apollo/client';

interface signUpFormInterface {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type { signUpFormInterface };

interface createMemberResult {
  __typename: 'Member';
  id: string;
  email: string;
  displayName: string;
}
export type { createMemberResult };

interface createMemberVariables {
  displayName: string;
  email: string;
  password: string;
}
export type { createMemberVariables };

interface useSignUpInterface {
  (closeModal: (() => void) | undefined): [
    JSX.Element,
    { message: string } | null
  ];
}
export type { useSignUpInterface };

type createMemberMutateType = (
  options?:
    | MutationFunctionOptions<
        createMemberVariables,
        createMemberVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) => Promise<FetchResult>;
export type { createMemberMutateType };

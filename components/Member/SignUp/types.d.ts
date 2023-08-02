import {
  ApolloCache,
  FetchResult,
  MutationFunctionOptions,
  DefaultContext,
} from '@apollo/client';

interface SignUpFormInterface {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type { SignUpFormInterface };

interface CreateUserResult {
  __typename: 'Member';
  id: string;
  email: string;
  displayName: string;
}
export type { CreateUserResult };

interface CreateUserVariables {
  displayName: string;
  email: string;
  password: string;
}
export type { CreateUserVariables };

interface UseSignUpInterface {
  (closeModal: (() => void) | undefined): [
    JSX.Element,
    { message: string } | null
  ];
}
export type { UseSignUpInterface };

type CreateUserMutateType = (
  options?:
    | MutationFunctionOptions<
        CreateUserVariables,
        CreateUserVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) => Promise<FetchResult>;
export type { CreateUserMutateType };

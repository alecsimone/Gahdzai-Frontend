import {
  ApolloCache,
  FetchResult,
  MutationFunctionOptions,
  DefaultContext,
} from "@apollo/client";

interface signUpFormInterface {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type { signUpFormInterface };

interface createUserResult {
  __typename: "Member";
  id: string;
  email: string;
  displayName: string;
}
export type { createUserResult };

interface createUserVariables {
  displayName: string;
  email: string;
  password: string;
}
export type { createUserVariables };

interface useSignUpInterface {
  (closeModal: (() => void) | undefined): [
    JSX.Element,
    { message: string } | null
  ];
}
export type { useSignUpInterface };

type createUserMutateType = (
  options?:
    | MutationFunctionOptions<
        createUserVariables,
        createUserVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) => Promise<FetchResult>;
export type { createUserMutateType };

import { ApolloError } from '@apollo/client';
import { ChangeEventHandler, ReactNode } from 'react';

interface LogInResponse {
  authenticateMemberWithPassword: {
    __typename:
      | 'MemberAuthenticationWithPasswordSuccess'
      | 'MemberAuthenticationWithPasswordFailure';
  };
}

interface SubmitMutationInterface<FormInterface> {
  (options: {
    variables: FormInterface;
    onCompleted?: (d: any) => void; // This is just for the edge case of the log in mutation, which has a weird response and needs to be handled specially
    // onError: (err: ApolloError) => void;
    onError: (err: any) => void;
  }): Promise;
}

interface ErrorTranslatorInterface {
  (e: ApolloError): ApolloError | { message: string };
}

interface ManualUpdateObj {
  name: string;
  newValue: any;
}
export type { ManualUpdateObj };

interface UseFormInterface {
  <FormInterface>(
    initialState: FormInterface,
    callbackMutation: SubmitMutationInterface<FormInterface>,
    errorTranslator?: ErrorTranslatorInterface,
    submitButtonText?: string,
    cancelFunction?: () => void,
    customValidityCheck?: (state: FormInterface) => boolean
  ): [
    FormInterface,
    ChangeEventHandler<HTMLInputElement>,
    (children: ReactNode) => JSX.Element,
    (manualUpdateObj: ManualUpdateObj) => void
  ];
}

export default UseFormInterface;

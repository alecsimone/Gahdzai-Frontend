import { ApolloError } from "@apollo/client";
import { ChangeEventHandler, ReactNode } from "react";

interface logInResponse {
  authenticateMemberWithPassword: {
    __typename:
      | "MemberAuthenticationWithPasswordSuccess"
      | "MemberAuthenticationWithPasswordFailure";
  };
}

interface submitMutationInterface<formInterface> {
  (options: {
    variables: formInterface;
    onCompleted?: (d: any) => void; // This is just for the edge case of the log in mutation, which has a weird response and needs to be handled specially
    // onError: (err: ApolloError) => void;
    onError: (err: any) => void;
  }): Promise;
}

interface errorTranslatorInterface {
  (e: ApolloError): ApolloError | { message: string };
}

interface manualUpdateObj {
  name: string;
  newValue: any;
}
export type { manualUpdateObj };

interface useFormInterface {
  <formInterface>(
    initialState: formInterface,
    callbackMutation: submitMutationInterface<formInterface>,
    errorTranslator?: errorTranslatorInterface,
    submitButtonText?: string,
    cancelFunction?: () => void,
    customValidityCheck?: (state: formInterface) => boolean
  ): [
    formInterface,
    ChangeEventHandler<HTMLInputElement>,
    (children: ReactNode) => JSX.Element,
    (manualUpdateObj: manualUpdateObj) => void
  ];
}

export default useFormInterface;

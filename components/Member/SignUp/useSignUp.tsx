import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import useForm from "@/components/Foundation/Form/useForm";
import DisplayNameField from "@/components/Foundation/Form/FormFields/DisplayNameField";
import EmailField from "@/components/Foundation/Form/FormFields/EmailField";
import PasswordField from "@/components/Foundation/Form/FormFields/PasswordField";
import ConfirmPasswordField from "@/components/Foundation/Form/FormFields/ConfirmPasswordField";
import useLogInForCallback from "../FinishReset/useLogInForCallback";
import SIGN_UP_MUTATION from "./signUpMutation";
import {
  createMemberResult,
  createMemberVariables,
  signUpFormInterface,
  useSignUpInterface,
} from "./types";
import signUpErrorTranslator from "./signUpErrorTranslator";

const initialState: signUpFormInterface = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useSignUp: useSignUpInterface = (closeModal) => {
  // We need an error state that can hold any errors in the log in mutation
  const [signUpError, setSignUpError] = useState<{ message: string } | null>(
    null
  );

  // We'll need a router to route to the verification page after signing up
  const router = useRouter();

  // Once the user signs up, we want to log them in. We'll use this mutation to do so.
  const logIn = useLogInForCallback(setSignUpError, false);

  // The createMember mutation, which routes to the verification page and logs the user in on completion. Errors will be handled by the form created by the useForm hook.
  const [createMember] = useMutation<createMemberResult, createMemberVariables>(
    SIGN_UP_MUTATION,
    {
      onCompleted: () => {
        if (closeModal) {
          closeModal();
        }
        router.push({ pathname: "/verification" });
        logIn({
          variables: {
            // eslint-disable-next-line no-use-before-define
            email: formState.email,
            // eslint-disable-next-line no-use-before-define
            password: formState.password,
          },
        });
      },
    }
  );

  // Get our form pieces
  const [formState, handleFormUpdate, formCreator] =
    useForm<signUpFormInterface>(
      initialState,
      createMember,
      signUpErrorTranslator,
      "Sign Up"
    );

  // Create our form fields
  const { displayName, email, password, confirmPassword } = formState;
  const formFields = [
    <DisplayNameField
      value={displayName}
      onChange={handleFormUpdate}
      key="displayName"
    />,
    <EmailField value={email} onChange={handleFormUpdate} key="email" />,
    <PasswordField
      value={password}
      onChange={handleFormUpdate}
      key="password"
    />,
    <ConfirmPasswordField
      value={confirmPassword}
      onChange={handleFormUpdate}
      firstPasswordEntry={password}
      key="confirmPassword"
    />,
  ];

  // Put the form together
  const form = formCreator(formFields);

  // Send back the form and an error message state
  return [form, signUpError];
};

export default useSignUp;

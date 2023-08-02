import { useState } from 'react';
import { useMutation } from '@apollo/client';
import EmailField from '@/components/Foundation/Form/FormFields/EmailField';
import PasswordField from '@/components/Foundation/Form/FormFields/PasswordField';
import useForm from '@/components/Foundation/Form/useForm';
import INITIAL_MEMBER_QUERY from '@/utils/member/initialMemberQuery.gql';
import LOG_IN_MUTATION from './logInMutation.gql';
import { LogInFormStateInterface } from './types';

const initialState: LogInFormStateInterface = {
  email: '',
  password: '',
};

export const logInErrorMessage =
  'No member found for that email and password combination';

const useLogIn = (): [JSX.Element, boolean, { message: string } | null] => {
  // We need an error state that can hold any errors in the log in mutation
  const [logInError, setLogInError] = useState<{ message: string } | null>(
    null
  );

  // We also want a success state so we can show a success message if the log in is successful.
  const [logInSuccess, setLogInSuccess] = useState(false);

  // Our log in mutation, which refetches all the data we need for the newly logged in member and shows them their success or error message
  const [logIn] = useMutation(LOG_IN_MUTATION, {
    refetchQueries: [
      {
        query: INITIAL_MEMBER_QUERY,
      },
    ],
    onCompleted: (d) => {
      if (d.logIn?.success) {
        setLogInSuccess(true);
      } else {
        setLogInError({
          message: logInErrorMessage,
        });
      }
    },
  });

  // Get our form pieces
  const [formState, handleFormUpdate, formCreator] =
    useForm<LogInFormStateInterface>(initialState, logIn, undefined, 'Log In');

  // Make our form fields
  const { email, password } = formState;
  const formFields = [
    <EmailField value={email} onChange={handleFormUpdate} key="email" />,
    <PasswordField
      value={password}
      onChange={handleFormUpdate}
      key="password"
    />,
  ];

  const form = formCreator(formFields);

  // Send back our form and our success and error messages
  return [form, logInSuccess, logInError];
};

export default useLogIn;

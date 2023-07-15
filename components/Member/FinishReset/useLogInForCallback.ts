import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { SetStateAction } from 'react';
import INITIAL_MEMBER_QUERY from 'utils/member/initialMemberQuery';
import LOG_IN_MUTATION from '../LogIn/logInMutation';
import { logInFormStateInterface, logInResult } from '../LogIn/types';
import { didLoginWork } from './constants';

const useLogInForCallback = (
  setError: (
    value: SetStateAction<{
      message: string;
    } | null>
  ) => void,
  redirect: boolean = true
) => {
  const router = useRouter();

  const [logIn] = useMutation<logInResult, logInFormStateInterface>(
    LOG_IN_MUTATION,
    {
      onCompleted: (logInData) => {
        if (didLoginWork(logInData)) {
          if (redirect) {
            router.push({ pathname: '/' });
          }
        } else {
          setError({
            message: 'Log In failed',
          });
        }
      },
      refetchQueries: [
        {
          query: INITIAL_MEMBER_QUERY,
        },
      ],
    }
  );
  return logIn;
};
export default useLogInForCallback;

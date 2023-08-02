import { ApolloError, useMutation, FetchResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import INITIAL_MEMBER_QUERY from '@/utils/member/initialMemberQuery.gql';
import { Log_Out_MutationMutation } from '@/__generated__/graphql';
import LOG_OUT_MUTATION from './logOutMutation.gql';

interface LogOutInterface {
  (): Promise<
    FetchResult<
      Log_Out_MutationMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
}

const useLogOut = (): [LogOutInterface, ApolloError | null] => {
  const router = useRouter();
  const [error, setError] = useState<ApolloError | null>(null);
  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    refetchQueries: [
      {
        query: INITIAL_MEMBER_QUERY,
      },
    ],
    onError: (e) => setError(e as ApolloError),
    onCompleted: () => router.push({ pathname: '/' }),
  });

  return [logOut, error];
};

export default useLogOut;

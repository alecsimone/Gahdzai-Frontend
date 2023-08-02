import INITIAL_MEMBER_QUERY from '@/utils/member/initialMemberQuery.gql';
import LOG_IN_MUTATION from './logInMutation.gql';

const validLogInMock = [
  {
    request: {
      query: LOG_IN_MUTATION,
      variables: {
        email: 'test@example.com',
        password: '123456789',
      },
    },
    result: {
      data: {
        logIn: {
          __typename: 'SuccessMessage',
          success: true,
          message: 'Successfully logged in.',
        },
      },
    },
  },
  {
    request: {
      query: INITIAL_MEMBER_QUERY,
    },
    result: {
      data: {
        currentUser: {
          __typename: 'User',
          id: '8',
          role: 'USER',
          displayName: 'Alec',
          avatar: null,
        },
      },
    },
  },
];
export { validLogInMock };

const invalidLogInMock = [
  {
    request: {
      query: LOG_IN_MUTATION,
      variables: {
        email: 'test@example.com',
        password: '123456789',
      },
    },
    result: {
      data: {
        logIn: {
          __typename: 'SuccessMessage',
          success: false,
          message: 'Incorrect email or password',
        },
      },
    },
  },
  {
    request: {
      query: INITIAL_MEMBER_QUERY,
    },
    result: {
      data: {
        currentUser: null,
      },
    },
  },
];
export { invalidLogInMock };

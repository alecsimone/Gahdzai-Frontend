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
];
export { invalidLogInMock };

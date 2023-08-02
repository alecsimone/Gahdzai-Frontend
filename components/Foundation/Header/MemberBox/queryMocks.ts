import MEMBER_BOX_QUERY from './memberBoxQuery.gql';

export const loggedOutMock = [
  {
    request: {
      query: MEMBER_BOX_QUERY,
    },
    result: {
      data: {
        currentUser: null,
      },
    },
  },
];

export const loggedInMock = [
  {
    request: {
      query: MEMBER_BOX_QUERY,
    },
    result: {
      data: {
        currentUser: {
          __typename: 'User',
          avatar: null,
          displayName: 'Test',
        },
      },
    },
  },
];
